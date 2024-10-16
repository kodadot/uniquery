import { expect, it, describe } from 'vitest'
import { parsePath, pathToRequest } from '../src/rest/path'
import { extendFields, getClient } from '../src'

describe.only('Path utils', () => {
  describe('parse path should', () => {
    it('be fully defined', () => {
      const pathname = '/ahk/item/176-1'
      const [chain, call, id] = parsePath(pathname)
      expect(chain).eq('ahk')
      expect(call).eq('item')
      expect(id).eq('176-1')
    })

    it('have id undefined', () => {
      const pathname = '/ahk/item'
      const [chain, call, id] = parsePath(pathname)
      expect(chain).eq('ahk')
      expect(call).eq('item')
      expect(id).eq(undefined)
    })
  })

  describe('collecion id in', () => {
    const id = [
      '0xd9a2c93ba2e9fae10fe762a42ee807bbf95764cc',
      '0x2f36072129aabb22bd4afffca0640a3e02695925'
    ]

    it('should do something', () => {
      const res = pathToRequest('/base/collectionByIdIn/' + id)
      expect(res.query).not.toBeUndefined()
    })

    it('should return collection In result when passing string separeted by ,', async () => {
      const client = getClient('base')
      const query = client.collectionByIdIn(id.toString())
      const result = await client.fetch(query)
      expect(result).not.toBeUndefined()
    })

    it('should return collection Id In result when passing array', async () => {
      const client = getClient('base')
      const query = client.collectionByIdIn(id)
      const result = await client.fetch(query)
      expect(result).not.toBeUndefined()
    })
  })

  describe('ahp filter burned items', () => {
    const collectionId = '244'
    const client = getClient('ahp')

    it('should return only burned items from collection', async () => {
      const query = client.itemListByCollectionId(collectionId, { burned: true, orderBy: 'blockNumber_ASC', fields: extendFields(['burned']) })
      const result = await client.fetch(query)

      expect(result).not.toBeUndefined()

      if (result.data) {
        result.data.items.forEach(element => {
          expect(element).toHaveProperty('burned', true)
        })
      }
    })

    it('should return all non-burned items from collection', async () => {
      const query = client.itemListByCollectionId(collectionId, { burned: false, orderBy: 'blockNumber_ASC', fields: extendFields(['burned']) })
      const result = await client.fetch(query)

      expect(result).not.toBeUndefined()

      if (result.data) {
        result.data.items.forEach(element => {
          expect(element).toHaveProperty('burned', false)
        })
      }
    })
  })

  describe('ahk path to request', () => {
    const tests = [
      { input: 'collection/2305670031' },
      { input: 'collectionByIssuer/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'collectionByOwner/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'eventByAddress/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'eventByInteraction/BUY' },
      { input: 'eventByItemId/2305670031-1' },
      { input: 'item/2305670031-1' },
      { input: 'itemByCollection/2305670031' },
      { input: 'itemByIssuer/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'itemByCid/bafkreihdgtq6ufy2i2ow7ff264lk5mwhnsrlnwgsikz534b2bybdxdrbjm' },
      { input: 'itemByOwner/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'itemCollectedBy/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' },
      { input: 'itemSoldBy/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' }
    ]

    for (const test of tests) {
      it(test.input, () => {
        const res = pathToRequest(`/ahk/${test.input}`)
        expect(res.baseURL).toBe('https://ahk.gql.api.kodadot.xyz/')
        expect(res).haveOwnProperty('query')
        expect(res.query).not.toBeUndefined()
      })
    }
  })

  describe('failed path to request', () => {
    const tests = [
      { input: 'sbx/collection/2305670031' },
      { input: 'rmrk/itemById/2305670031-1' },
      { input: 'collectionByIssuer/bXhUWXbffHMJk2FoTriLixXjQY36RPDkX5Tugy5WYSmafJsGi' }
    ]

    for (const test of tests) {
      it(test.input, () => {
        const fn = () => pathToRequest(`/${test.input}`)
        expect(fn).toThrow(ReferenceError)
      })
    }
  })
})
