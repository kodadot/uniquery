import { expect, it, describe } from 'vitest'
import { getUrl } from '../src'

describe('KODAPI UTILS', () => {
  describe('getURL', () => {
    it('should return default kusama indexer', () => {
      const url = getUrl('ksm')
      expect(url).eq('https://squid.subsquid.io/rubick/graphql')
    })

    it('should return subsquid kusama indexer', () => {
      const url = getUrl('ksm', 'subsquid')
      expect(url).eq('https://squid.subsquid.io/rubick/graphql')
    })

    it('should throw on subquery kusama indexer', () => {
      const fn = () => getUrl('ksm', 'subquery')
      expect(fn).toThrow(ReferenceError)
    })
  })
})
