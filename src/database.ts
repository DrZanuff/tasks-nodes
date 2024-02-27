import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const path = join(__dirname, 'db.json')
const databasePath = path.replace('/dist/', '/db/')

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

  select(table: string, search?: any) {
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
