import { Prefix as PrefixUnion } from '@kodadot1/static'
import AbstractClient from '../clients/abstractClient'
import { GraphQuery, Or } from '../types'

export type GraphRequest = {
  baseURL: string,
  query: GraphQuery
  path: string
}

export type GraphLike<T> = { data: T } | T

export type ClientCall = keyof AbstractClient<any, any>

export type MayString = Or<string, undefined>

export type Prefix = Exclude<PrefixUnion, 'rmrk2'>
