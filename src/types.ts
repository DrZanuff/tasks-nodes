import type { IncomingMessage, ServerResponse } from 'node:http'

export type HTTPProps = {
  req: IncomingMessage & {
    body?: any
  }
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage
  }
}
