import { HTTPProps } from 'src/types'

export function getInfo({ req, res }: HTTPProps) {
  const endpoints = {
    '/': 'Get endpoints info. Use GET',
    '/taks': 'List all tasks. Uset GET',
  }

  return res.writeHead(200).end(JSON.stringify(endpoints))
}
