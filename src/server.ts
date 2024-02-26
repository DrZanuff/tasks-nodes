import { createServer } from 'node:http'
import { routes } from './routes/index'
import { json } from './middlewares/json'
import { DataBase } from './database'

const database = new DataBase()

const server = createServer(async (req, res) => {
  const { method, url } = req

  await json({ req, res })

  const route = routes.find(
    (currentRoute) => currentRoute.method == method && currentRoute.url == url
  )

  if (route) {
    return route.handler({ req, res, database })
  }

  return res.end('Welcome to Tasks Nodes')
})

server.listen(3333)
