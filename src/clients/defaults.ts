import { ObjProp, Fields, QueryOptions, BaseEvent } from '../types'

export const defaultField = ['id', 'metadata', 'currentOwner', 'issuer']
export const defaultEventField: ObjProp<BaseEvent> = ['id', 'interaction', 'timestamp', 'caller', 'meta']
export const DEFAULT_LIMIT = 20
// todo: add default orderBy
export const defaultQueryOptions: QueryOptions = {
  limit: DEFAULT_LIMIT
}

export function getFields<T>(fields?: ObjProp<T>, defaultList: ObjProp<T> | string[] = defaultField): Fields<T> {
  return fields ?? defaultList
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
