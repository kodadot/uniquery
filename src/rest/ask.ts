// /bsx/nft/:id
// TODO: fn returns { data: T } but should return T
// unwrap data should be done in the caller
import { $fetch } from 'ofetch'
import { QueryProps } from '../types'
import { getOptions } from '../indexers/utils'
import { pathToRequest } from './path'
import { GraphLike } from './types'

const GRAPHQL_PATH = '/graphql'

function askFor<T>(
  path: string,
  options?: QueryProps<T>,
): Promise<GraphLike<T>> {
  const request = pathToRequest(path, options)
  const opts = getOptions(request)
  return $fetch<GraphLike<T>>(GRAPHQL_PATH, opts)
}

export { askFor as ask }
