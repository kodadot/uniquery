import { expect, it, describe } from 'vitest'
import { parsePath, pathToRequest } from '../src/rest/path'

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

  describe('path to request', () => {
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
