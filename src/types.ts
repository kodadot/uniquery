export type KeyOf<T> = keyof T
export type ObjProp<T> = Array<KeyOf<T>>
export type FieldList = Array<string | object>

export type Fields<T> = FieldList | ObjProp<T>
export type KeyValue = {
  [k: string]: any;
}

export type GraphQuery = {
  query: string
  variables: any
}

export type QueryOptions = {
  limit?: number
  offset?: number
  orderBy?: string
}

// NOW: client.eventListByNftId('123', ['id', 'name'], { limit: 10 })
// NEW: client.eventListByNftId('123', { fields: ['id', 'name'], limit: 10 })
export type QueryProps<T> = QueryOptions & {
  fields?: ObjProp<T>
}

export type AbstractBase = {
  blockNumber: bigint
  createdAt: Date
  currentOwner: string
  id: string
  issuer: string
  metadata: string
  name: string
}

type MetadataEntity = {
  id: string
  name: string
  description: string
  image: string
  // attributes: [Attribute!]
  animationUrl: string
  type: string
}

export type BaseCollection = AbstractBase & {
  max: number
  metadata: string
  symbol: string
  version: string
}

export type SquidCollection = BaseCollection & {
  // nfts: [NFTEntity] @derivedFrom(field: "collection")
  // events: [CollectionEvent]
  meta: MetadataEntity
}

export type BaseNFT = AbstractBase & {
  burned: Boolean
  collection: SquidCollection
  instance: string
  price: bigint
  sn: string
  transferable: number
  updatedAt: Date
}

export type BaseEvent = {
  id: string
  blockNumber: bigint
  timestamp: Date
  caller: string
  currentOwner: string
  interaction: string
  meta: string
}

export type SquidNFT = BaseNFT & {
  hash: string
  // events: [Event] @derivedFrom(field: "nft")
  // emotes: [Emote] @derivedFrom(field: "nft")
  meta: MetadataEntity
}

export type Provider = 'subquery' | 'subsquid'

export type Or<A, B> = A | B

// TODO:
// export const unwrapSpecific = (fields: string[]): FieldList => {
// }

export type FilterType = 'blockNumber' | 'updatedAt' | 'price' | 'sn'
export type FilterOrderDirection = 'ASC' | 'DESC'
export type FilterOrderType = [FilterOrderDirection, FilterOrderDirection?]
export type FilterBuilder = [FilterType, FilterOrderType?]
export type FilterMappingFn = (filter: FilterType, direction: FilterOrderDirection) => string
