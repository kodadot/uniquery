import { INDEXERS } from '@kodadot1/static'
import { Prefix } from './types'

export const getUrl = (chain: Prefix | ''): string => INDEXERS[chain]

export const getAvailableChains = (): Prefix[] =>
  Object.keys(INDEXERS) as Prefix[]
