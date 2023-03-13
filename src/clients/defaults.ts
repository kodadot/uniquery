import { ObjProp, Fields, QueryOptions, BaseEvent, AbstractBase } from '../types'

export const defaultField: ObjProp<AbstractBase> = ['id', 'createdAt', 'name', 'metadata', 'currentOwner', 'issuer']
export const defaultEventField: ObjProp<BaseEvent> = ['id', 'interaction', 'timestamp', 'caller', 'meta']
export const DEFAULT_LIMIT = 100
// todo: add default orderBy
export const defaultQueryOptions: QueryOptions = {
  limit: DEFAULT_LIMIT
}

export const GRAPHQL_PATH = '/graphql'

function hasMetaField(field: any): boolean {
  return typeof field === 'string' && field === 'meta'
}

export function extendFields<T extends AbstractBase>(fields: ObjProp<T>): ObjProp<T> {
  const set = new Set([...defaultField, ...fields])
  return [...set]
}

export function getFields<T>(fields?: ObjProp<T>, defaultList: ObjProp<T> | string[] = defaultField): Fields<T> {
  const list = fields ?? defaultList

  const metaIndex = list.findIndex(hasMetaField)

  if (metaIndex !== -1) {
    list.splice(metaIndex, 1, { meta: ['id', 'name', 'description', 'image', 'animationUrl', 'type'] } as any)
  }

  return list
}

export function wrapSubqueryList<T>(fields: Fields<T>): [{ nodes: Fields<T> }] {
  return [{ nodes: fields }]
}

export function optionToQuery(
  options: QueryOptions,
  injectDefault = true
): string {
  const final = injectDefault ? ensureOptions(options) : options
  let query = ''
  if (final.limit) {
    query += `limit: ${final.limit}`
  }
  if (final.offset) {
    query += `, offset: ${final.offset}`
  }
  if (final.orderBy) {
    query += `, orderBy: "${final.orderBy}"`
  }
  return query
}

export function ensureOptions(options?: QueryOptions): QueryOptions {
  const queryOptions = options ?? {}
  return {
    ...defaultQueryOptions,
    ...queryOptions,
    limit: Math.min(queryOptions.limit ?? DEFAULT_LIMIT, defaultQueryOptions.limit)
  }
}
