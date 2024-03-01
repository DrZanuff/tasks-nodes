import { getInfo } from './handlers/getInfo'
import { createTask } from './handlers/createTask'
import { getTasks } from './handlers/getTasks'
import { updateTask } from './handlers/updateTask'
import { deleteTask } from './handlers/deleteTask'
import { buildRoutePath } from '../utils/buildRoutePath'

export const routes = [
  {
    url: buildRoutePath('/tasks'),
    method: 'POST',
    handler: createTask,
  },
  {
    url: buildRoutePath('/tasks'),
    method: 'GET',
    handler: getTasks,
  },
  {
    url: buildRoutePath('/tasks/:id'),
    method: 'PUT',
    handler: updateTask,
  },
  {
    url: buildRoutePath('/tasks/:id'),
    method: 'DELETE',
    handler: deleteTask,
  },
  {
    url: buildRoutePath('/'),
    method: 'GET',
    handler: getInfo,
  },
]
