import { expect, it, describe } from 'vitest'
import { ensureOrderBy } from '../src/clients/defaults'

describe('ORDERING', () => {
  // describe('isOrderByValid', () => {
  //   const tests = [
  //     { input: 'createdAt_ASC' , expected: true },
  //     { input: ['createdAt_ASC', 'sn_ASC'] , expected: true },
  //     { input: [] , expected: false },
  //     { input: undefined , expected: false },
  //   ]

  //   for (const test of tests) {
  //     it(`should be ${test.expected ? 'valid' : 'invalid'} for ${test.input}`, () => {
  //       const res = isOrderByValid(test.input as any)
  //       expect(res).toBe(test.expected)
  //     })
  //   }
  // })

  describe('ensureOrderBy', () => {
    const tests = [
      { input: 'createdAt_ASC' , expected: 'createdAt_ASC' },
      { input: ['createdAt_ASC', 'sn_ASC'] , expected: '[createdAt_ASC,sn_ASC]' },
      { input: [] , expected: '[]' },
      { input: undefined , expected: '[]' },
    ]

    for (const test of tests) {
      it(`should be ${test.expected} for ${test.input}`, () => {
        const res = ensureOrderBy(test.input as any)
        expect(res).toBe(test.expected)
      })
    }
  })
})
