
import { BaseEvent, GraphQuery, ObjProp, QueryProps } from '../types'
// Collection, Token
interface AbstractClient<C, T, E = BaseEvent> {
  collectionById(id: string, fields?: ObjProp<C>): GraphQuery
  // collectionListBy(id: string, field: KeyOf<C>, fields?: ObjProp<C>): GraphQuery
  collectionListByIssuer(issuer: string, options?: QueryProps<C>): GraphQuery
  collectionListByOwner(owner: string, options?: QueryProps<C>): GraphQuery
  eventListByAddress(address: string, options?: QueryProps<E>): GraphQuery
  // eventListByCollectionId(id: string, options?: QueryProps<E>): GraphQuery
  // eventListByCollectionIdAndInteraction(id: string, interaction: string, options?: QueryProps<E>): GraphQuery
  eventListByInteraction(interaction: string, options?: QueryProps<E>): GraphQuery
  eventListByNftId(id: string, options?: QueryProps<E>): GraphQuery
  nftById(id: string, fields?: ObjProp<T>): GraphQuery
  // nftListBy(id: string, field: KeyOf<T>, fields?: ObjProp<T>): GraphQuery
  nftListByCollectionId(id: string, options?: QueryProps<T>): GraphQuery
  nftListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<T>): GraphQuery
  nftListByCollectionIdList(ids: string[], options?: QueryProps<T>): GraphQuery
  nftListByIssuer(issuer: string, options?: QueryProps<T>): GraphQuery
  nftListByMetadataId(id: string, options?: QueryProps<T>): GraphQuery
  nftListByMetadataIdMatch(id: string, options?: QueryProps<T>): GraphQuery
  nftListByOwner(owner: string, options?: QueryProps<T>): GraphQuery
  nftListCollectedBy(address: string, options?: QueryProps<T>): GraphQuery
  nftListForSale(options?: QueryProps<T>): GraphQuery
  nftListSoldBy(address: string, options?: QueryProps<T>): GraphQuery
  // collectionStatListById(id: string, options?: QueryProps<T>): GraphQuery
  // lastNftIdbyCollectionId(id: string, options?: QueryProps<T>): GraphQuery
}

export default AbstractClient
