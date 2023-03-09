import getClient from './clients/factory'
import SquidClient from './clients/SquidClient'
import getUrl from './indexers'

export { extendFields } from './clients/defaults'
export * from './rest'

export { SquidClient, getClient, getUrl }
