// /bsx/nft/:id
// TODO: fn returns { data: T } but should return T
// unwrap data should be done in the caller
import { $fetch } from 'ohmyfetch'
import { pathToRequest } from './path'
import { GraphLike } from './types'
import { getOptions } from './utils'

const GRAPHQL_PATH = '/graphql'

function askFor<T>(path: string): Promise<GraphLike<T>> {
  const request = pathToRequest(path)
  const options = getOptions(request)
  return $fetch<GraphLike<T>>(GRAPHQL_PATH, options)
}

export { askFor as ask }
