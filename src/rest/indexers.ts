import { INDEXERS } from '@kodadot1/static'
import { Prefix } from '../types'

export const getUrl = (chain: Prefix | ''): string => {
  switch (chain) {
    case 'local': {
      return 'http://localhost:4350/graphql'
    }
    default: {
      return INDEXERS[chain]
    }
  }
}

export const getAvailableChains = (): Prefix[] =>
  Object.keys(INDEXERS) as Prefix[]
