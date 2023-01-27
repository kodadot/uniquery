import { INDEXERS } from '@kodadot1/vuex-options'
import { Provider, Or } from '../types'

function getUrl(chain: string, provider: Or<Provider, ''> = ''): string {
  const result = INDEXERS.find(
    ({ info, value }) => info === chain && value.toString().includes(provider)
  )
  if (!result) {
    throw new ReferenceError('Indexer not found')
  }

  return result.value as string
}

export default getUrl
