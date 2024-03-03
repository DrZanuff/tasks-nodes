import { getInfo } from './handlers/getInfo'
import { createTask } from './handlers/createTask'
import { getTasks } from './handlers/getTasks'
import { updateTask } from './handlers/updateTask'
import { deleteTask } from './handlers/deleteTask'
import { completeTask } from './handlers/completeTask'
import { parseTasks } from './handlers/parseTasks'
import { buildRoutePath } from '../utils/buildRoutePath'

export const routes = [
  {
    url: buildRoutePath('/parse/tasks/'),
    method: 'POST',
    handler: parseTasks,
  },
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
    url: buildRoutePath('/tasks/:id/complete'),
    method: 'PATCH',
    handler: completeTask,
  },
  {
    url: buildRoutePath('/'),
    method: 'GET',
    handler: getInfo,
  },
]
