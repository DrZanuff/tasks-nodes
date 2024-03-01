import type { HTTPPropsWithDataBase } from 'src/types'
import get from 'lodash/get'
import { TASKS_TABLE } from '../../config'

export function completeTask({ req, res, database }: HTTPPropsWithDataBase) {
  try {
    const id = get(req, 'params.id', '')

    if (!id) {
      return res.writeHead(500).end('Missing the ID')
    }

    const row = database.select(TASKS_TABLE, { id })

    if (row.length === 0) {
      return res.writeHead(404).end('Task not found')
    }

    const task = database.update(TASKS_TABLE, id, {
      ...row[0],
      completed_at: new Date(),
    })

    return res.writeHead(200).end(`Task Completed: \n\n${JSON.stringify(task)}`)
  } catch (e) {
    return res.writeHead(500).end(JSON.stringify(e))
  }
}
