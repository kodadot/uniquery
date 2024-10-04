import getClient from './clients/factory'
import SquidClient from './clients/SquidClient'
import getUrl from './indexers'

export { extendFields } from './clients/defaults'
export { fetchQuery, graphFetch } from './indexers'
export { Prefix } from './types'
export * from './rest'

// eslint-disable-next-line unicorn/prefer-export-from
export { getClient, getUrl, SquidClient }
