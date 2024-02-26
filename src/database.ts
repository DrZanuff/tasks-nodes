import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// const databasePath = new URL('db.json', import.meta.url).pathname
const path = join(__dirname, 'db.json')
// const databasePath = new URL('db.json', path).pathname
const databasePath = path.replace('/dist/', '/db/')
console.log('DBG: path', path, '\n\n')
console.log('DBG: databasePath', databasePath, '\n\n')

// const path = __dirname.replace('/dist', '/db/db.json')

// // const databasePath = new URL('db.json', `file:/${__filename}`).pathname
// // const databasePath = new URL('db.json', path).pathname
// const databasePath = new URL('db.json', `file:/${path}`).pathname
// console.log('DBG2:', `file:/${__dirname}`, '|', `file:/${__filename}`)
// console.log('DBG:', 'DataBase:', databasePath)
// console.log('DBG3-----:', path)

type Row = Record<string, any>

export class DataBase {
  #database: Record<string, Row[]> = {}

  constructor() {
    readFile(databasePath, {
      encoding: 'utf-8',
    })
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    writeFile(databasePath, JSON.stringify(this.#database), {
      encoding: 'utf-8',
    })
  }

  select(table: string, search: string) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(String(value).toLocaleLowerCase())
        })
      })
    }

    return data
  }

  insert(table: string, data: any) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table: string, id: string) {
    let data: any[] = []
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((element) => {
        return element?.id === id
      })

      if (index !== -1) {
        data = this.#database[table].splice(index, 1)
        this.#persist()
      }
    }

    return data
  }

  update(table: string, id: string, data: any) {
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((element) => {
        return element?.id === id
      })

      if (index > -1) {
        const newData = { id, ...data }
        data = this.#database[table][index] = newData
        this.#persist()

        return newData
      }
    }

    return null
  }
}
