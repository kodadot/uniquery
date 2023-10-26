import {
  FilterBuilder,
  FilterMappingFn,
  FilterOrderDirection,
  FilterOrderType,
  FilterType,
} from '../types'

export function getFilters(filters: FilterBuilder[]) {
  const mappingFn = subsquidFilterMapping
  return generateFilters(filters, mappingFn)
}

function generateFilters(
  filters: FilterBuilder[],
  mappingFn: FilterMappingFn,
): string[] {
  return filters
    .flatMap(([type, directions]) =>
      getFilterOrders(directions).map((direction) => mappingFn(type, direction))
    )
}

/* deprecated */
// function subqueryFilterMapping(
//   filter: FilterType,
//   direction: FilterOrderDirection
// ): string {
//   const value = snakeCase(filter).toUpperCase()
//   return appendFilterDirection(value, direction)
// }

function subsquidFilterMapping(
  filter: FilterType,
  direction: FilterOrderDirection,
): string {
  return appendFilterDirection(filter, direction)
}

function appendFilterDirection(
  filter: string,
  direction: FilterOrderDirection,
) {
  return filter + '_' + direction
}

function getFilterOrders(
  filterOrders: FilterOrderType,
): FilterOrderDirection[] {
  if (!filterOrders) {
    return ['ASC', 'DESC']
  }

  return filterOrders.filter(Boolean)
}
