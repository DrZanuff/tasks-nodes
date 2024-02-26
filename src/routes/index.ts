import { getInfo } from './handlers/getInfo'

export const routes = [
  {
    url: '/',
    method: 'GET',
    handler: getInfo,
  },
]
