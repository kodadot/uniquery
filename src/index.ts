import getClient from './clients/factory'
import SquidClient from './clients/SquidClient'
import getUrl from './indexers'

export type { Prefix } from '@kodadot1/static'
export { extendFields } from './clients/defaults'
export { fetchQuery, graphFetch } from './indexers'
export * from './rest'

// eslint-disable-next-line unicorn/prefer-export-from
export { getClient, getUrl, SquidClient }
