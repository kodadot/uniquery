import { FetchOptions } from 'ohmyfetch'
import { GraphLike, GraphRequest } from './types'

export const getOptions = ({
  baseURL,
  query
}: GraphRequest): FetchOptions<'json'> => ({
  baseURL,
  method: 'POST',
  body: query
})

export const uwrapRequest = <T>(req: GraphLike<T>): T => {
  const data = (req as any).data

  if (data) {
    return data as T
  }

  return req as T
}
