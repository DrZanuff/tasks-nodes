import { HTTPPropsWithDataBase } from 'src/types'
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
  console.log('DBG: IsValid', { title, description })
  if (!title || !description) {
    return false
  }

  return true
}

export function createTask({ req, res, database }: HTTPPropsWithDataBase) {
  const id = randomUUID()
  const body = JSON.parse(req.body)
  console.log('DBG: BODY-----', body)
  const title = get(body, 'title') as string
  const description = get(body, 'description') as string
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

  return res.writeHead(201).end(`Task created \n\n ${JSON.stringify(payload)}`)
}
