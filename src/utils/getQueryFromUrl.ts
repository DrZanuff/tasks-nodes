export function getQueryFromUrl(url: string) {
  const query = url.split('?')

  if (query.length >= 1) {
    return query[1]
  }

  return ''
}
