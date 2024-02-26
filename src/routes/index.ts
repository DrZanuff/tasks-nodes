import { getInfo } from './handlers/getInfo'
import { createTask } from './handlers/createTask'

export const routes = [
  {
    url: '/tasks',
    method: 'POST',
    handler: createTask,
  },
  {
    url: '/',
    method: 'GET',
    handler: getInfo,
  },
]
