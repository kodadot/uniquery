import { expect, it, describe } from 'vitest'
import { getUrl } from '../src'

describe('KODAPI UTILS', () => {
  describe('getURL', () => {
    it('should return default kusama indexer', () => {
      const url = getUrl('kusama')
      expect(url).eq('https://squid.subsquid.io/rubick/v/008/graphql')
    })

    it('should return subsquid kusama indexer', () => {
      const url = getUrl('kusama', 'subsquid')
      expect(url).eq('https://squid.subsquid.io/rubick/v/008/graphql')
    })

    it('should throw on subquery kusama indexer', () => {
      const fn = () => getUrl('kusama', 'subquery')
      expect(fn).toThrow(ReferenceError)
    })
  })
})
