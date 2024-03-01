import type { HTTPPropsWithDataBase } from 'src/types'
import get from 'lodash/get'
import { TASKS_TABLE } from '../../config'

function validatePayload(body: Record<string, any>) {
  const title = get(body, 'title')
  const description = get(body, 'description')

  if (!title || !description) {
    return false
  }

  return {
    title,
    description,
  }
}

export function updateTask({ req, res, database }: HTTPPropsWithDataBase) {
  try {
    const id = get(req, 'params.id', '')

    if (!id) {
      return res.writeHead(500).end('Missing the ID')
    }

    const payload = validatePayload(JSON.parse(req.body))

    if (!payload) {
      return res.writeHead(500).end('Missing data for update the task')
    }

    const row = database.select(TASKS_TABLE, { id })

    if (row.length === 0) {
      return res.writeHead(404).end('Task not found')
    }

    const completed_at: string | null = get(row, '[0].completed_at', null)
    const created_at: string | null = get(row, '[0].created_at', null)

    const task = database.update(TASKS_TABLE, id, {
      ...payload,
      created_at,
      completed_at,
      updated_at: new Date(),
    })

    return res.writeHead(200).end(`Task updated: \n\n${JSON.stringify(task)}`)
  } catch (e) {
    return res.writeHead(500).end(JSON.stringify(e))
  }
}
