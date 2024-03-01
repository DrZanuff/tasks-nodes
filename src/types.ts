import type { IncomingMessage, ServerResponse } from 'node:http'
import { DataBase } from './database'

export type Req = IncomingMessage & {
  body?: any
  query?: Record<string, string>
  params?: {
    [key: string]: string
  }
}

export type Res = ServerResponse<IncomingMessage> & {
  req: IncomingMessage
}

export type HTTPProps = {
  req: Req
  res: Res
  database?: any
}

export interface HTTPPropsWithDataBase extends HTTPProps {
  database: DataBase
}
