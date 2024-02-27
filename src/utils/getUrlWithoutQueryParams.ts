export function getUrlWithoutQueryParams(urlWithQuery: string) {
  const url = urlWithQuery.split('?')

  return url[0]
}
