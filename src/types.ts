export type KeyOf<T> = keyof T
export type ObjProp<T> = Array<KeyOf<T>>
// FieldList is a type that can is array containing either a string or an object that contains a string array
export type FieldList = Array<string | { [meta: string]: string[] }>

export type Fields<T> = FieldList | ObjProp<T>
export type KeyValue = {
  [k: string]: any
}

type GraphType = any

export type StrictKeyValue = {
  [k: string]: any | {
    value: any
    required?: boolean
    type?: GraphType
    list?: boolean
    name?: string
  }
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

export type GraphLike<T> = { data: T } | T

// NOW: client.eventListByNftId('123', ['id', 'name'], { limit: 10 })
// NEW: client.eventListByNftId('123', { fields: ['id', 'name'], limit: 10 })
export type QueryProps<T> = QueryOptions & {
  fields?: ObjProp<T>
  burned?: boolean
}

export type AbstractBase = {
  blockNumber: bigint
  createdAt: Date
  currentOwner: string
  id: string
  issuer: string
  image?: string
  metadata: string
  media: string
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
  burned: boolean
  collection: SquidCollection
  hash: string
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
export type QueryEntity =
  | 'collection'
  | 'collections'
  | 'event'
  | 'events'
  | 'item'
  | 'items'
  | 'collectionCount'
  | 'itemCount'
  | 'eventCount'
export type FilterOrderDirection = 'ASC' | 'DESC'
export type FilterOrderType = [FilterOrderDirection, FilterOrderDirection?]
export type FilterBuilder = [FilterType, FilterOrderType?]
export type FilterMappingFn = (
  filter: FilterType,
  direction: FilterOrderDirection,
) => string
