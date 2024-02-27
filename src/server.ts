import { createServer } from 'node:http'
import { routes } from './routes/index'
import { json } from './middlewares/json'
import { DataBase } from './database'
import { extractQueryParams } from './utils/extractQueryParams'
import { getQueryFromUrl } from './utils/getQueryFromUrl'
import isEmpty from 'lodash/isEmpty'
import type { Req, Res } from './types'
import { getUrlWithoutQueryParams } from './utils/getUrlWithoutQueryParams'

const database = new DataBase()

const server = createServer(async (req: Req, res: Res) => {
  const { method, url } = req

  await json({ req, res })

  const urlWithoutQueryParams = getUrlWithoutQueryParams(String(url))

  const route = routes.find(
    (currentRoute) =>
      currentRoute.method == method && currentRoute.url == urlWithoutQueryParams
  )

  if (route) {
    const rawQuery = getQueryFromUrl(String(req.url))
    const query = extractQueryParams(rawQuery)

    req.query = !isEmpty(query) ? query : undefined

    return route.handler({ req, res, database })
  }

  return res.end('Welcome to Tasks Nodes')
})

server.listen(3333)
