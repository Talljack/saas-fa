export function url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
  return new URL(path, baseUrl)
}
