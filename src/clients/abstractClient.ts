import { BaseEvent, GraphLike, GraphQuery, ObjProp, QueryProps } from '../types'
// Collection, Token
interface AbstractClient<C, T, E = BaseEvent> {
  collectionById(id: string, fields?: ObjProp<C>): GraphQuery
  collectionByIdIn(id: string | string[], fields?: ObjProp<C>): GraphQuery
  // collectionListBy(id: string, field: KeyOf<C>, fields?: ObjProp<C>): GraphQuery
  collectionCountByIssuer(issuer: string): GraphQuery
  collectionCountByName(name: string): GraphQuery
  collectionCountByOwner(owner: string): GraphQuery
  collectionCountCreatedAfter(date: Date): GraphQuery
  collectionListByIssuer(issuer: string, options?: QueryProps<C>): GraphQuery
  collectionListByName(name: string, options?: QueryProps<C>): GraphQuery
  collectionListByOwner(owner: string, options?: QueryProps<C>): GraphQuery
  // collectionListWhere(where: Record<string, unknown>, options?: QueryProps<C>): GraphQuery
  collectionListCreatedAfter(date: Date, options?: QueryProps<C>): GraphQuery
  eventList(options?: QueryProps<E>): GraphQuery
  eventListByAddress(address: string, options?: QueryProps<E>): GraphQuery
  eventListByCollectionId(id: string, options?: QueryProps<E>): GraphQuery
  eventListByCollectionIdAndInteraction(id: string, interaction: string, options?: QueryProps<E>): GraphQuery
  eventListByCollectionIdAndInteractionList(id: string, interactions: string[], options?: QueryProps<E>): GraphQuery
  eventListByInteraction(
    interaction: string,
    options?: QueryProps<E>,
  ): GraphQuery
  eventListByItemId(id: string, options?: QueryProps<E>): GraphQuery
  eventListByItemIdAndInteraction(
    id: string,
    interaction: string,
    options?: QueryProps<E>,
  ): GraphQuery
  eventListByItemIdAndInteractionList(
    id: string,
    interactions: string[],
    options?: QueryProps<E>,
  ): GraphQuery
  itemById(id: string, fields?: ObjProp<T>): GraphQuery
  itemCountByOwner(owner: string): GraphQuery
  itemCountByIssuer(issuer: string): GraphQuery
  itemCountByName(name: string): GraphQuery
  itemCountCollectedBy(address: string): GraphQuery
  itemCountSoldBy(address: string): GraphQuery
  itemCountByCollectionId(id: string): GraphQuery
  itemCountForSale(): GraphQuery
  itemCountForSaleByCollectionId(id: string): GraphQuery
  itemCountByCollectionIdAndOwner(id: string, owner: string): GraphQuery
  itemCountCreatedAfter(date: Date): GraphQuery
  // itemListBy(id: string, field: KeyOf<T>, fields?: ObjProp<T>): GraphQuery
  itemListByCollectionId(id: string, options?: QueryProps<T>): GraphQuery
  itemListByCollectionIdAndOwner(
    id: string,
    owner: string,
    options?: QueryProps<T>,
  ): GraphQuery
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
  // itemListWhere(where: Record<string, unknown>, options?: QueryProps<T>): GraphQuery
  itemListCreatedAfter(date: Date, options?: QueryProps<T>): GraphQuery
  // collectionStatListById(id: string, options?: QueryProps<T>): GraphQuery
  // lastItemIdbyCollectionId(id: string, options?: QueryProps<T>): GraphQuery

  // COUNTING QUERTIES
  // eventCountByAddress(address: string): GraphQuery ;
  // eventCountByCollectionId(id: string): GraphQuery ;
  // eventCountByInteraction(interaction: string): GraphQuery ;
  // eventCountByItemId(id: string): GraphQuery ;
  fetch<D>(query: GraphQuery): Promise<GraphLike<D>>
}

export default AbstractClient
