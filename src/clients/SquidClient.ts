
import build from '../queryBuilder'
import { BaseEvent, GraphQuery, KeyOf, ObjProp, QueryProps, SquidCollection, SquidNFT } from '../types'

import AbstractClient from './abstractClient'
import { defaultEventField, getFields, optionToQuery } from './defaults'

class SquidClient implements AbstractClient<SquidCollection, SquidNFT> {
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

  collectionListByOwner(owner: string, options?: QueryProps<SquidCollection>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`collections: collectionEntities(where: {currentOwner_eq: "${owner}"}  ${optionList})`, toQuery)
  }

  eventListByAddress(address: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields ?? defaultEventField)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {caller_eq: "${address}" } ${optionList})`, toQuery)
  }

  eventListByInteraction(interaction: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields ?? defaultEventField)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {interaction_eq: ${interaction}} ${optionList})`, toQuery)
  }

  eventListByItemId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields ?? defaultEventField)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {item: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemById(id: string, fields?: ObjProp<SquidNFT>): GraphQuery {
    const toQuery = getFields(fields)
    return build('item: itemEntityById', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  itemListByOwner(owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {currentOwner_eq: "${owner}"} ${optionList})`, toQuery)
  }

  itemListByIssuer(issuer: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {issuer_eq: "${issuer}"} ${optionList})`, toQuery)
  }

  itemListCollectedBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {currentOwner_eq: "${address}", issuer_not_eq: "${address}"} ${optionList})`, toQuery)
  }

  itemListSoldBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {currentOwner_not_eq: "${address}", issuer_eq: "${address}"} ${optionList})`, toQuery)
  }

  itemListByCollectionId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListForSale(options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {price_gt: "0"} ${optionList})`, toQuery)
  }

  itemListBy(id: string, field: KeyOf<SquidNFT>, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    return build(`items: itemEntities(where: {${field}_eq: "${id}"})`, toQuery)
  }

  itemListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: { currentOwner_eq: "${owner}", collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListByCollectionIdList(ids: string[], options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const list = JSON.stringify(ids)
    return build(`items: itemEntities(where: {collection: {id_in: ${list}}} ${optionList})`, toQuery)
  }

  itemListByMetadataId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {meta: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  itemListByMetadataIdMatch(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`items: itemEntities(where: {meta: {id_containsInsensitive: "${id}"}} ${optionList})`, toQuery)
  }
}

export default SquidClient
