import { Prefix } from '@kodadot1/static'
import SquidClient from './SquidClient'

type Client = SquidClient

function getClient(prefix?: Prefix): Client {
  return new SquidClient(prefix)
}

/* deprecated */
// export function isSubQuery(provider?: Provider) {
//   return provider === 'subquery'
// }

export default getClient
