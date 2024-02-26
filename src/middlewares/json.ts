import { HTTPProps } from 'src/types'

export async function json({ req, res }: HTTPProps) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = Buffer.concat(buffers).toString()
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}
