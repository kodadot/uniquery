
import { BaseEvent, GraphQuery, ObjProp, QueryProps } from '../types'
// Collection, Token
interface AbstractClient<C, T, E = BaseEvent> {
  collectionById(id: string, fields?: ObjProp<C>): GraphQuery
  // collectionListBy(id: string, field: KeyOf<C>, fields?: ObjProp<C>): GraphQuery
  collectionListByIssuer(issuer: string, options?: QueryProps<C>): GraphQuery
  collectionListByName(name: string, options?: QueryProps<C>): GraphQuery
  collectionListByOwner(owner: string, options?: QueryProps<C>): GraphQuery
  eventList(options?: QueryProps<T>): GraphQuery
  eventListByAddress(address: string, options?: QueryProps<E>): GraphQuery
  eventListByCollectionId(id: string, options?: QueryProps<E>): GraphQuery
  // eventListByCollectionIdAndInteraction(id: string, interaction: string, options?: QueryProps<E>): GraphQuery
  eventListByInteraction(interaction: string, options?: QueryProps<E>): GraphQuery
  eventListByItemId(id: string, options?: QueryProps<E>): GraphQuery
  itemById(id: string, fields?: ObjProp<T>): GraphQuery
  // itemListBy(id: string, field: KeyOf<T>, fields?: ObjProp<T>): GraphQuery
  itemListByCollectionId(id: string, options?: QueryProps<T>): GraphQuery
  itemListByCollectionIdAndOwner(id: string, owner: string, options?: QueryProps<T>): GraphQuery
  itemListByCollectionIdList(ids: string[], options?: QueryProps<T>): GraphQuery
  itemListByIssuer(issuer: string, options?: QueryProps<T>): GraphQuery
  itemListByName(name: string, options?: QueryProps<T>): GraphQuery
  itemListByMetadataId(id: string, options?: QueryProps<T>): GraphQuery
  itemListByMetadataIdMatch(id: string, options?: QueryProps<T>): GraphQuery
  itemListByOwner(owner: string, options?: QueryProps<T>): GraphQuery
  itemListCollectedBy(address: string, options?: QueryProps<T>): GraphQuery
  itemListForSale(options?: QueryProps<T>): GraphQuery
  itemListForSaleByCollectionId(id: string, options?: QueryProps<T>): GraphQuery
  itemListSoldBy(address: string, options?: QueryProps<T>): GraphQuery
  // collectionStatListById(id: string, options?: QueryProps<T>): GraphQuery
  // lastItemIdbyCollectionId(id: string, options?: QueryProps<T>): GraphQuery
}

export default AbstractClient
