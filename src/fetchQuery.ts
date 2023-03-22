fetch<D>(query: GraphQuery): Promise<GraphLike<D>> {
  const baseURL = getUrl(this.prefix)
  const opts = getOptions({ query, baseURL, path: '' })
  return $fetch<GraphLike<D>>(baseURL, opts)
}
