/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prefix } from '@kodadot1/static'
import build from '../queryBuilder'
import { GraphQuery, ObjProp, BaseCollection, BaseNFT, QueryOptions, BaseEvent, QueryProps, GraphLike } from '../types'

import AbstractClient from './abstractClient'
import { getFields, optionToQuery, wrapSubqueryList } from './defaults'

class SubqueryClient implements AbstractClient<BaseCollection, BaseNFT> {
  private prefix: Prefix

  constructor(prefix: Prefix) {
    this.prefix = prefix
  }

  collectionListByName(name: string, options?: QueryProps<BaseCollection>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemById(id: string, fields?: ObjProp<BaseNFT>): GraphQuery {
    const toQuery = getFields(fields)
    return build('item: nFTEntity', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  itemListByOwner(owner: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`items: nFTEntities(filter: { currentOwner: { equalTo: ${owner} } })`, toQuery)
  }

  itemListByIssuer(issuer: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`items: nFTEntities(filter: { issuer: { equalTo: ${issuer} } })`, toQuery)
  }

  itemListCollectedBy(address: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`items: nFTEntities(filter: { issuer: { notEqualTo: ${address} } currentOwner: { equalTo: ${address} } burned: { distinctFrom: true } })`, toQuery)
  }

  itemListSoldBy(address: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`items: nFTEntities(filter: { issuer: { equalTo: ${address} } currentOwner: { notEqualTo: ${address} } burned: { distinctFrom: true } })`, toQuery)
  }

  itemListForSale(options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    const optionList = optionToQuery(options, true)
    return build(`items: nFTEntities(filter: { price: { greaterThan: "0" } } ) ${optionList}`, toQuery)
  }

  itemListByCollectionId(collectionId: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`items: nFTEntities(filter: { collectionId: { equalTo: ${collectionId} } })`, toQuery)
  }

  collectionById(id: string, fields?: ObjProp<BaseCollection>): GraphQuery {
    const toQuery = getFields(fields)
    return build('collection: collectionEntity', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  collectionListByOwner(owner: string, options?: QueryProps<BaseCollection>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`collections: collectionEntities(filter: { currentOwner: { equalTo: ${owner} } })`, toQuery)
  }

  collectionListByIssuer(issuer: string, options?: QueryProps<BaseCollection>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`collections: collectionEntities(filter: { issuer: { equalTo: ${issuer} } })`, toQuery)
  }

  eventList(options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  eventListByAddress(address: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  eventListByCollectionId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  eventListByCollectionIdAndInteraction(id: string, interaction: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  eventListByInteraction(interaction: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  eventListByItemId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListByCollectionIdList(ids: string[], options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListByName(name: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListByMetadataId(id: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListByMetadataIdMatch(id: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  itemListForSaleByCollectionId(id: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  fetch<D>(query: GraphQuery): Promise<GraphLike<D>> {
    throw new Error('Method not implemented.')
  }
}

export default SubqueryClient
