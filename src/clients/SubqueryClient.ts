/* eslint-disable @typescript-eslint/no-unused-vars */

import build from '../queryBuilder'
import { GraphQuery, ObjProp, BaseCollection, BaseNFT, QueryOptions, BaseEvent, QueryProps } from '../types'

import AbstractClient from './abstractClient'
import { getFields, optionToQuery, wrapSubqueryList } from './defaults'

class SubqueryClient implements AbstractClient<BaseCollection, BaseNFT> {
  nftById(id: string, fields?: ObjProp<BaseNFT>): GraphQuery {
    const toQuery = getFields(fields)
    return build('nft: nFTEntity', toQuery, { id: { type: 'String', required: true, value: id, name: 'id' } })
  }

  nftListByOwner(owner: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`nfts: nFTEntities(filter: { currentOwner: { equalTo: ${owner} } })`, toQuery)
  }

  nftListByIssuer(issuer: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`nfts: nFTEntities(filter: { issuer: { equalTo: ${issuer} } })`, toQuery)
  }

  nftListCollectedBy(address: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`nfts: nFTEntities(filter: { issuer: { notEqualTo: ${address} } currentOwner: { equalTo: ${address} } burned: { distinctFrom: true } })`, toQuery)
  }

  nftListSoldBy(address: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`nfts: nFTEntities(filter: { issuer: { equalTo: ${address} } currentOwner: { notEqualTo: ${address} } burned: { distinctFrom: true } })`, toQuery)
  }

  nftListForSale(options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    const optionList = optionToQuery(options, true)
    return build(`nfts: nFTEntities(filter: { price: { greaterThan: "0" } } ) ${optionList}`, toQuery)
  }

  nftListByCollectionId(collectionId: string, options?: QueryProps<BaseNFT>): GraphQuery {
    const toQuery = wrapSubqueryList(getFields(options?.fields))
    return build(`nfts: nFTEntities(filter: { collectionId: { equalTo: ${collectionId} } })`, toQuery)
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

  eventListByNftId(id: string, options?: QueryProps<BaseEvent>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  nftListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  nftListByCollectionIdList(ids: string[], options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  nftListByMetadataId(id: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }

  nftListByMetadataIdMatch(id: string, options?: QueryProps<BaseNFT>): GraphQuery {
    throw new Error('Method not implemented.')
  }
}

export default SubqueryClient
