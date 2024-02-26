import type { IncomingMessage, ServerResponse } from 'node:http'
import { DataBase } from './database'

export type HTTPProps = {
  req: IncomingMessage & {
    body?: any
  }
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage
  }
  database?: any
}

export interface HTTPPropsWithDataBase extends HTTPProps {
  database: DataBase
}
