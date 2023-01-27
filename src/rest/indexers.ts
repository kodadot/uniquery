import { Prefix } from './types'

export const indexers: Record<Prefix, string> = {
  ksm: 'https://squid.subsquid.io/rubick/v/008',
  bsx: 'https://squid.subsquid.io/snekk/v/005',
  snek: 'https://squid.subsquid.io/snekk/v/004',
  movr: 'https://squid.subsquid.io/antick/v/001-rc0',
  glmr: 'https://squid.subsquid.io/click/v/002'
}

export const getUrl = (chain: Prefix | ''): string => indexers[chain]
