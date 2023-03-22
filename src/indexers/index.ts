import { INDEXERS, Prefix } from '@kodadot1/static'
import { $fetch } from 'ofetch'
import { GraphLike, GraphQuery, Or, Provider } from '../types'
import { getOptions } from './utils'

function getUrl(chain: Prefix, provider: Or<Provider, ''> = ''): string {
  const result: string | undefined = INDEXERS[chain]

  if (!result || provider === 'subquery') {
    throw new ReferenceError('Indexer not found')
  }

  return result
}

export function graphFetch<D>(baseURL: string, query: GraphQuery): Promise<GraphLike<D>> {
  const opts = getOptions({ query, baseURL, path: '' })
  return $fetch<GraphLike<D>>(baseURL, opts)
}

export function fetchQuery<D>(prefix: Prefix, query: GraphQuery): Promise<GraphLike<D>> {
  const baseURL = getUrl(prefix)
  return graphFetch<D>(baseURL, query)
}

export default getUrl
