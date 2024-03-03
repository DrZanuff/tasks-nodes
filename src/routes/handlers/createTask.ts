import type { HTTPPropsWithDataBase, Res, DataBase } from 'src/types'
import { get } from 'lodash'
import { randomUUID } from 'crypto'
import { TASKS_TABLE } from '../../config'

function isValidTaskPayload({
  title,
  description,
}: {
  title: string
  description: string
}) {
  if (!title || !description) {
    return false
  }

  return true
}

export function createNewTask({
  title,
  description,
  res,
  database,
}: {
  title: string
  description: string
  res: Res
  database: DataBase
}) {
  const id = randomUUID()
  const completed_at = null
  const created_at = new Date()
  const updated_at = new Date()

  if (!isValidTaskPayload({ title, description })) {
    return res.writeHead(500).end('Missing data!')
  }

  const payload = {
    id,
    title,
    description,
    completed_at,
    created_at,
    updated_at,
  }

  database.insert(TASKS_TABLE, payload)

  return payload
}

export function createTask({ req, res, database }: HTTPPropsWithDataBase) {
  const body = JSON.parse(req.body)
  const title = get(body, 'title') as string
  const description = get(body, 'description') as string

  const payload = createNewTask({ title, description, res, database })

  return res.writeHead(201).end(`Task created \n\n ${JSON.stringify(payload)}`)
}
