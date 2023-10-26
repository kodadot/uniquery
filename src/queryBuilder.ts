import { query } from 'gql-query-builder'
import { FieldList, GraphQuery, KeyValue } from './types'

function build(
  operation: string,
  fields: FieldList,
  variables?: KeyValue,
): GraphQuery {
  return query({
    operation,
    variables,
    fields,
  })
}

export default build
