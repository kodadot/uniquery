import { $URL, withoutLeadingSlash } from 'ufo'
import getClient from '../clients/factory'
import { GraphQuery, QueryProps } from '../types'
import { getUrl } from './indexers'
import { ClientCall, GraphRequest, Prefix } from './types'

const pathMap: Record<string, ClientCall> = {
  collection: 'collectionById',
  collectionByName: 'collectionListByName',
  collectionByOwner: 'collectionListByOwner',
  collectionByIssuer: 'collectionListByIssuer',
  eventByAddress: 'eventListByAddress',
  eventByCollection: 'eventListByCollectionId',
  eventByInteraction: 'eventListByInteraction',
  eventByItemId: 'eventListByItemId',
  item: 'itemById',
  itemForSaleByCollection: 'itemListForSaleByCollectionId',
  itemByCollection: 'itemListByCollectionId',
  itemByCollectionList: 'itemListByCollectionIdList',
  itemByName: 'itemListByName',
  itemByIssuer: 'itemListByIssuer',
  itemByCid: 'itemListByMetadataIdMatch',
  itemByOwner: 'itemListByOwner',
  itemCollectedBy: 'itemListCollectedBy',
  itemSoldBy: 'itemListSoldBy'
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
const makeQuery = (call: string, id: string, options?: QueryProps<any>): GraphQuery => {
  const client = getClient()
  const method = getCall(call)
  const fn: any | undefined = client[method]
  if (fn === undefined || !(typeof fn === 'function')) {
    throw new ReferenceError(`[UNIQUERY::REST] Unable to make call: ${call}`)
  }

  return fn(id, options)
}

// /bsx/item/:id
// TODO: should return GraphRequest
export function pathToRequest(path: string, options?: QueryProps<any>): GraphRequest {
  const { pathname } = urlOf(path) // query: options
  const [chain, call, id] = parsePath(pathname)
  if (!hasCall(call) || !supportChain(chain)) {
    throw new ReferenceError(`[UNIQUERY::REST] Invalid path: ${path}`)
  }

  const baseURL = getUrl(chain as Prefix)
  const graphQuery = makeQuery(call, id, options)

  return { baseURL, query: graphQuery, path }
  // const [chain, call, param] = path.split('/').filter(Boolean)
}
