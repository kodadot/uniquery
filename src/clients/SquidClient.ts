
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

  eventListByNftId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    const toQuery = getFields(options?.fields ?? defaultEventField)
    const optionList = optionToQuery(options, true)
    return build(`events(where: {nft: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  nftById(id: string, fields?: ObjProp<SquidNFT>): GraphQuery {
    const toQuery = getFields(fields)
    return build('nft: nftEntityById', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  nftListByOwner(owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {currentOwner_eq: "${owner}"} ${optionList})`, toQuery)
  }

  nftListByIssuer(issuer: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {issuer_eq: "${issuer}"} ${optionList})`, toQuery)
  }

  nftListCollectedBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {currentOwner_eq: "${address}", issuer_not_eq: "${address}"} ${optionList})`, toQuery)
  }

  nftListSoldBy(address: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {currentOwner_not_eq: "${address}", issuer_eq: "${address}"} ${optionList})`, toQuery)
  }

  nftListByCollectionId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  nftListForSale(options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {price_gt: "0"} ${optionList})`, toQuery)
  }

  nftListBy(id: string, field: KeyOf<SquidNFT>, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    return build(`nfts: nftEntities(where: {${field}_eq: "${id}"})`, toQuery)
  }

  nftListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: { currentOwner_eq: "${owner}", collection: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  nftListByCollectionIdList(ids: string[], options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    const list = JSON.stringify(ids)
    return build(`nfts: nftEntities(where: {collection: {id_in: ${list}}} ${optionList})`, toQuery)
  }

  nftListByMetadataId(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {meta: {id_eq: "${id}"}} ${optionList})`, toQuery)
  }

  nftListByMetadataIdMatch(id: string, options?: QueryProps<SquidNFT>): GraphQuery {
    const toQuery = getFields(options?.fields)
    const optionList = optionToQuery(options, true)
    return build(`nfts: nftEntities(where: {meta: {id_containsInsensitive: "${id}"}} ${optionList})`, toQuery)
  }
}

export default SquidClient
