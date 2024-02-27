import { getInfo } from './handlers/getInfo'
import { createTask } from './handlers/createTask'
import { getTasks } from './handlers/getTasks'

export const routes = [
  {
    url: '/tasks',
    method: 'POST',
    handler: createTask,
  },
  {
    url: '/tasks',
    method: 'GET',
    handler: getTasks,
  },
  {
    url: '/',
    method: 'GET',
    handler: getInfo,
  },
]
