import { INDEXERS, Prefix } from '@kodadot1/static'
import { Provider, Or } from '../types'

function getUrl(chain: Prefix, provider: Or<Provider, ''> = ''): string {
  const result: string | undefined = INDEXERS[chain]

  if (!result || provider === 'subquery') {
    throw new ReferenceError('Indexer not found')
  }

  return result
}

export default getUrl
