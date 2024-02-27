import isEmpty from 'lodash/isEmpty'
import { TASKS_TABLE } from '../../config'
import type { HTTPPropsWithDataBase } from 'src/types'

export function getTasks({ req, res, database }: HTTPPropsWithDataBase) {
  const query = req.query

  const tasks = database.select(TASKS_TABLE, isEmpty(query) ? null : query)

  res.writeHead(200).end(JSON.stringify(tasks))
}
