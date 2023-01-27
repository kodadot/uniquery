import SquidClient from './SquidClient'

type Client = SquidClient

function getClient(): Client {
  return new SquidClient()
}

/* deprecated */
// export function isSubQuery(provider?: Provider) {
//   return provider === 'subquery'
// }

export default getClient
