import { $URL, withoutLeadingSlash } from 'ufo'
import getClient from '../clients/factory'
import { GraphQuery } from '../types'
import { getUrl } from './indexers'
import { ClientCall, GraphRequest, Prefix } from './types'

const pathMap: Record<string, ClientCall> = {
  collection: 'collectionById',
  collectionByOwner: 'collectionListByOwner',
  collectionByIssuer: 'collectionListByIssuer',
  eventByAddress: 'eventListByAddress',
  eventByInteraction: 'eventListByInteraction',
  eventByNftId: 'eventListByNftId',
  nft: 'nftById',
  nftByCollection: 'nftListByCollectionId',
  nftByCollectionList: 'nftListByCollectionIdList',
  nftByIssuer: 'nftListByIssuer',
  nftByCid: 'nftListByMetadataIdMatch',
  nftByOwner: 'nftListByOwner',
  nftCollectedBy: 'nftListCollectedBy',
  nftSoldBy: 'nftListSoldBy'
}

export const parsePath = (pathname: string): string[] => {
  return withoutLeadingSlash(pathname).split('/')
}

const hasCall = (call: string | undefined): boolean => call in pathMap
const getCall = (call: string): ClientCall => pathMap[call]
const supportChain = (chain: string | undefined): boolean => {
  const uri = getUrl((chain as Prefix) || '')
  return !!uri
}

const urlOf = (path: string): $URL => new $URL(path)
const makeQuery = (call: string, id: string): GraphQuery => {
  const client = getClient()
  const method = getCall(call)
  const fn: any | undefined = client[method]
  if (fn === undefined || !(typeof fn === 'function')) {
    throw new ReferenceError(`[UNIQUERY::REST] Unable to make call: ${call}`)
  }

  return fn(id)
}

// /bsx/nft/:id
// TODO: should return GraphRequest
export function pathToRequest(path: string): GraphRequest {
  const { pathname } = urlOf(path) // query: options
  const [chain, call, id] = parsePath(pathname)
  if (!hasCall(call) || !supportChain(chain)) {
    throw new ReferenceError(`[UNIQUERY::REST] Invalid path: ${path}`)
  }

  const baseURL = getUrl(chain as Prefix)
  const graphQuery = makeQuery(call, id)

  return { baseURL, query: graphQuery, path }
  // const [chain, call, param] = path.split('/').filter(Boolean)
}
