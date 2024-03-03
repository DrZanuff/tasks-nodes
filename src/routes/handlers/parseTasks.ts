import fs from 'node:fs'
import { parse } from 'csv-parse'
import type { HTTPPropsWithDataBase } from 'src/types'
import { join } from 'node:path'
import { getRootPath } from '../../getRootPath'
import { createNewTask } from './createTask'

// Path => /db/tasks.csv
const path = join(getRootPath(), 'tasks.csv')
const csvFilePath = path.replace('/dist/', '/db/')

type Record = [string, string]

const processFile = async () => {
  const records: Record[] = []
  const parser = fs.createReadStream(csvFilePath).pipe(parse({ from: 2 }))

  for await (const record of parser) {
    records.push(record)
  }

  return records
}

export async function parseTasks({
  req,
  res,
  database,
}: HTTPPropsWithDataBase) {
  const records = await processFile()

  for await (const record of records) {
    console.log('DBG:', { record })
    createNewTask({ title: record[0], description: record[1], res, database })
  }

  res.writeHead(200).end('Done!')
}
