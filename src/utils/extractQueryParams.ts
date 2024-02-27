export function extractQueryParams(query: string) {
  return query?.split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')
    queryParams[key] = String(value).toLocaleLowerCase()

    return queryParams
  }, {} as Record<string, string>)
}
