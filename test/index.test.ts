import { expect, it, describe } from 'vitest'
import { getUrl } from '../src'
import { extendFields, getFields, includeBurned } from '../src/clients/defaults'
import { SquidNFT } from '../src/types'

describe('UNIQUERY UTILS', () => {
  describe('getURL', () => {
    it('should return default kusama indexer', () => {
      const url = getUrl('rmrk')
      expect(url).eq('https://squid.subsquid.io/rubick/graphql')
    })

    it('should return subsquid kusama indexer', () => {
      const url = getUrl('rmrk', 'subsquid')
      expect(url).eq('https://squid.subsquid.io/rubick/graphql')
    })

    it('should throw on subquery kusama indexer', () => {
      const fn = () => getUrl('ksm', 'subquery')
      expect(fn).toThrow(ReferenceError)
    })

    it('should return default kusama indexer', () => {
      const url = getUrl('ksm')
      expect(url).eq('https://squid.subsquid.io/marck/v/v2/graphql')
    })

    it('should return default basilisk indexer', () => {
      const url = getUrl('bsx')
      expect(url).eq('https://squid.subsquid.io/snekk/graphql')
    })

    it('should return default Kusama Asset Hub indexer', () => {
      const url = getUrl('ahk')
      expect(url).eq('https://squid.subsquid.io/stick/graphql')
    })

    it('should return default Polkadot Asset Hub indexer', () => {
      const url = getUrl('ahp')
      expect(url).eq('https://squid.subsquid.io/speck/graphql')
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

  describe('extendFields', () => {
    it('should return default fields', () => {
      const fields = extendFields<SquidNFT>(['meta'])
      expect(fields).toStrictEqual(['id', 'createdAt', 'name', 'metadata', 'currentOwner', 'issuer', 'meta'])
    })

    it('should return unique fields', () => {
      const fields = extendFields<SquidNFT>(['id', 'metadata', 'name', 'meta'])
      expect(fields).toStrictEqual(['id', 'createdAt', 'name', 'metadata', 'currentOwner', 'issuer', 'meta'])
    })
  })

  describe('includeBurned', () => {
    it('should return value false when no options are present', () => {
      const burned = includeBurned<SquidNFT>(undefined)
      expect(burned).toBe('burned_eq: false')
    })

    it('should return value false when options are present, but burned not', () => {
      const burned = includeBurned<SquidNFT>({ limit: 20, offset: 10 })
      expect(burned).toBe('burned_eq: false')
    })

    it('should return empty true when burned present and true', () => {
      const burned = includeBurned<SquidNFT>({ limit: 20, offset: 10, burned: true })
      expect(burned).toBe('')
    })

    it('should return value false when burned present and false', () => {
      const burned = includeBurned<SquidNFT>({ limit: 20, offset: 10, burned: false })
      expect(burned).toBe('burned_eq: false')
    })
  })
})
