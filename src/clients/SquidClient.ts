
import { Prefix } from '@kodadot1/static'
import { $fetch } from 'ofetch'
import getUrl from '../indexers'
import { getOptions } from '../indexers/utils'
import build from '../queryBuilder'
import { BaseEvent, GraphLike, GraphQuery, KeyOf, ObjProp, QueryProps, SquidCollection, SquidNFT } from '../types'

import AbstractClient from './abstractClient'
import { defaultEventField, getFields, includeBurned, optionToQuery } from './defaults'

class SquidClient implements AbstractClient<SquidCollection, SquidNFT> {
  private prefix?: Prefix

  constructor(...args: [Prefix?]) {
    if (args.length === 1 && typeof args[0] !== 'undefined') {
      this.prefix = args[0]
    }
  }

  collectionById(id: string, fields?: ObjProp<SquidCollection>): GraphQuery {
    const toQuery = getFields(fields)
    return build('collection: collectionEntityById', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  collectionListBy(id: string, field: KeyOf<SquidCollection>, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    return build(`collections: collectionEntities(where: {${field}_eq: "${id}"})`, toQuery)
  }

  collectionListByIssuer(issuer: string, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`collections: collectionEntities(where: {issuer_eq: "${issuer}"} ${optionList})`, toQuery)
  }

  collectionListByName(name: string, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`collections: collectionEntities(where: {name_containsInsensitive: "${name}"} ${optionList})`, toQuery)
  }

  collectionListByOwner(owner: string, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`collections: collectionEntities(where: {currentOwner_eq: "${owner}"}  ${optionList})`, toQuery)
  }

  collectionListCreatedAfter(date: Date, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`collections: collectionEntities(where: {createdAt_gte: "${date.toISOString()}"}  ${optionList})`, toQuery)
  }

  eventList(options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields, defaultEventField, false)
    const optionList = optionToQuery(options, true)
    return build(`events(${optionList})`, toQuery)
  }

  eventListByAddress(address: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields, defaultEventField, false)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {caller_eq: "${address}" } ${optionList})`, toQuery)
  }

  eventListByCollectionId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields, defaultEventField, false)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {nft: {id_eq: "${id}"}} ${optionList})`, toQuery)
    // events(where: { nft: { collection: { id_eq: "" }}})
  }

  eventListByInteraction(interaction: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields, defaultEventField, false)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {interaction_eq: ${interaction}} ${optionList})`, toQuery)
  }

  eventListByItemId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields, defaultEventField, false)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {nft: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemById(id: string, fields?: ObjProp<SquidNFT>): GraphQuery {
    const toQuery = getFields(fields)
    return build('item: nftEntityById', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  itemListByOwner(owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const burned = includeBurned(options)
    return build(`items: nftEntities(where: {currentOwner_eq: "${owner}", ${burned}} ${optionList})`, toQuery)
  }

  itemListByIssuer(issuer: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const burned = includeBurned(options)
    return build(`items: nftEntities(where: {issuer_eq: "${issuer}",  ${burned}} ${optionList})`, toQuery)
  }

  itemListByName(name: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const burned = includeBurned(options)
    return build(`items: nftEntities(where: {name_containsInsensitive: "${name}", ${burned}} ${optionList})`, toQuery)
  }

  itemListCollectedBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const burned = includeBurned(options)
    return build(`items: nftEntities(where: {currentOwner_eq: "${address}", issuer_not_eq: "${address}", ${burned}} ${optionList})`, toQuery)
  }

  itemListSoldBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {currentOwner_not_eq: "${address}", issuer_eq: "${address}"} ${optionList})`, toQuery)
  }

  itemListByCollectionId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListForSale(options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {price_gt: "0"} ${optionList})`, toQuery)
  }

  itemListForSaleByCollectionId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {collection: {id_eq: "${id}"}, price_gt: "0"} ${optionList})`, toQuery)
  }

  itemListBy(id: string, field: KeyOf<SquidNFT>, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    return build(`items: nftEntities(where: {${field}_eq: "${id}"})`, toQuery)
  }

  itemListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: { currentOwner_eq: "${owner}", collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListByCollectionIdList(ids: string[], options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const list = JSON.stringify(ids)
    return build(`items: nftEntities(where: {collection: {id_in: ${list}}} ${optionList})`, toQuery)
  }

  itemListByMetadataId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {meta: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListByMetadataIdMatch(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {meta: {id_containsInsensitive: "${id}"}} ${optionList})`, toQuery)
  }

  itemListCreatedAfter(date: Date, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: nftEntities(where: {createdAt_gte: "${date.toISOString()}"} ${optionList})`, toQuery)
  }

  fetch<D>(query: GraphQuery): Promise<GraphLike<D>> {
    const baseURL = getUrl(this.prefix)
    const opts = getOptions({ query, baseURL, path: '' })
    return $fetch<GraphLike<D>>(baseURL, opts)
  }
}

export default SquidClient
