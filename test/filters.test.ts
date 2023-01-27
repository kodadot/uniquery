import { expect, it, describe } from 'vitest'
import { getFilters } from '../src/clients/filters'

describe('FILTERS', () => {
  describe('getFilters', () => {
    it('should return correct data for subsquid filter', () => {
      const filters = getFilters([['blockNumber'], ['price', ['ASC']], ['updatedAt', ['ASC', 'DESC']]])
      const [bnA, bnD, pA, uaA, uaD] = filters
      expect(bnA).eq('blockNumber_ASC')
      expect(bnD).eq('blockNumber_DESC')
      expect(pA).eq('price_ASC')
      expect(uaA).eq('updatedAt_ASC')
      expect(uaD).eq('updatedAt_DESC')
    })

    /* deprecated */
    // it('should return correct data for subquery filter', () => {
    //   const filters = getFilters([['blockNumber'], ['price', ['ASC']], ['updatedAt', ['ASC', 'DESC']]], 'subquery')
    //   const [bnA, bnD, pA, uaA, uaD] = filters
    //   expect(bnA).eq('BLOCK_NUMBER_ASC')
    //   expect(bnD).eq('BLOCK_NUMBER_DESC')
    //   expect(pA).eq('PRICE_ASC')
    //   expect(uaA).eq('UPDATED_AT_ASC')
    //   expect(uaD).eq('UPDATED_AT_DESC')
    // })
  })
})
