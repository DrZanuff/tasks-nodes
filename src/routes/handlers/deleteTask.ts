import type { HTTPPropsWithDataBase } from 'src/types'
import get from 'lodash/get'
import { TASKS_TABLE } from '../../config'

export function deleteTask({ req, res, database }: HTTPPropsWithDataBase) {
  try {
    const id = get(req, 'params.id', '')

    if (!id) {
      return res.writeHead(500).end('Missing the ID')
    }

    const row = database.delete(TASKS_TABLE, id)

    if (row.length === 0) {
      return res.writeHead(404).end('Task not found')
    }

    return res.writeHead(200).end(`Task Deleted: \n\n${JSON.stringify(row)}`)
  } catch (e) {
    return res.writeHead(500).end(JSON.stringify(e))
  }
}
