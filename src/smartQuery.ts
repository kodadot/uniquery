import { optionToQuery } from './clients/defaults'
import build from './queryBuilder'
import { FieldList, GraphQuery, KeyValue, QueryOptions } from './types'

type GraphEntity = `${string}: ${string}` | string
type RichOptions = QueryOptions & { fields?: FieldList, variables?: KeyValue }

export function buildSmart(entity: GraphEntity, where: Record<string, string>, { fields, variables, ...options }: RichOptions): GraphQuery {
  const optionList = optionToQuery(options, true)
  return build(`${entity}(where: ${JSON.stringify(where)} ${optionList})`, fields, variables)
}
