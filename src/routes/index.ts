import { getInfo } from './handlers/getInfo'

export const routes = [
  {
    url: '/',
    method: 'GET',
    handler: getInfo,
  },
  {
    url: '/tasks',
    method: 'POST',
    handler: getInfo,
  },
]
