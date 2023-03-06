import { expect, it, describe } from 'vitest'
import { getUrl } from '../src'
import { getFields } from '../src/clients/defaults'
import { SquidNFT } from '../src/types'

describe('UNIQUERY UTILS', () => {
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

  describe('getFields', () => {
    it('should return default fields', () => {
      const fields = getFields<SquidNFT>()
      expect(fields).toStrictEqual(['id', 'createdAt', 'name', 'metadata', 'currentOwner', 'issuer'])
    })

    it('should return only specified fields', () => {
      const fields = getFields<SquidNFT>(['id', 'metadata', 'name'])
      expect(fields).toStrictEqual(['id', 'metadata', 'name'])
    })

    it('should return unwrapped meta', () => {
      const [, meta] = getFields<SquidNFT>(['id', 'meta'])
      expect(meta).toStrictEqual({ meta: ['id', 'name', 'description', 'image', 'animationUrl', 'type'] })
    })
  })
})
