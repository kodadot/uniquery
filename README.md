# @kodadot1/uniquery

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> GraphQL builder for KodaDot API

![image](https://user-images.githubusercontent.com/5887929/217076647-3edd6aef-5b18-42e6-9a35-8bd2cf7c1ad6.png)


## Usage

Add Uniquery to your project

```sh
# with npm
npm install @kodadot1/uniquery

# with yarn
yarn install @kodadot1/uniquery

# with pnpm
pnpm install @kodadot1/uniquery
```

Import:

```js
// ESM
import { getClient } from '@kodadot1/uniquery'

// CommonJS
const  { getClient } = require('@kodadot1/uniquery')
```

```js
const client = getClient()
const query = client.collectionListByIssuer('vikiival')

console.log(query)
```

```js
{
  query: 'query  { collections: collectionEntities(filter: { issuer: { equalTo: vikiival } })  { nodes { id, metadata, currentOwner, issuer } } }',
  variables: {}
}
```

## ✨ Rationale
As we were onboarding developers for our NFT Gallery, most of the developers have seen GraphQL for the first. We wanted to make it easier for them to get started with KodaDot API. Uniquery is a simple tool to help you build GraphQL queries for KodaDot API.

Without Uniquery you would have to write something like this:

```graphql
query nftListByCollectionIdList {
  nft: nftEntities(where: {collection: { id_eq: "2305670031" }}) {
    id
    metadata
    currentOwner
    issuer
  }
}
```

With Uniquery you can write this:

```js
const id = '2305670031'
const client = getClient()
const query = client.nftListByCollectionId(id)
```

**To be aware every client function returns `GraphQuery` object**

This `GraphQuery` object represents a GraphQL query that should be passed to your preffered `fetch` library (`fetch`, `axios`, `ohmyfetch`)

> **Note:** Uniquery is not a GraphQL client. It's a tool to help you build GraphQL queries
> It's possible to use it with any GraphQL client (such as Apollo)


We have currently two implementations
- 1. Client

```js
import { getClient } from '@kodadot1/uniquery'
import { $fetch } from 'ohmyfetch'

const id = '2305670031'
const query = client.collectionById(id)
const result = await $fetch(SUBSQUID_INDEXER_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: query,
})
```

- 2. REST

```js
import { ask } from '@kodadot1/uniquery'
const id = '2305670031'
const result = await ask(`/bsx/nftByCollection/${id}`)
```


## ⚓️ Exported functions

### ✔️  Uniquery

- `getClient` - returns GrahpQL query builder
- `getUrl` - returns GrahpQL indexer url
- `SquidClient` - returns SquidClient instance

From REST:

- `ask` - obtain data from GraphQL indexer by selected route
- `pathToRequest` - converts route to corresponding GraphQL query


### ✔️  Uniquery.client

- collectionById - returns collection by id
- collectionListByIssuer - returns collections where issuer (creator) is equal to provided address
- collectionListByOwner - returns collections where owner is equal to provided address
- eventListByAddress - returns events by address
- eventListByInteraction - returns events by interaction
- eventListByNftId - returns events by nft id
- nftById - returns NFT by id
- nftListByCollectionId - returns NFTs where collection id is equal to provided id
- nftListByCollectionIdAndOwner - returns NFTs where collection id is equal to provided id and owner is equal to provided address
- nftListByCollectionIdList - return list of NFTs by list of collectionIds
- nftListByIssuer - returns NFTs where issuer (creator) is equal to provided address
- nftListByMetadataId - returns NFTs where metadata is equal to provided uri
- nftListByMetadataIdMatch -returns NFTs where metadata can match provided CID
- nftListByOwner - returns NFTs where owner is equal to provided address
- nftListCollectedBy - returns NFTs where owner is equal to provided address however it's not the issuer of the NFT
- nftListForSale - returns NFTs where price is greater than 0
- nftListSoldBy - no idea :shrug:

### ✔️  REST

- collection/:id
- collectionByIssuer/:issuer
- collectionByOwner/:owner
- eventByAddress/:address
- eventByInteraction/:interaction
- eventByNftId/:id
- nft/:id
- nftByCollection/:id
- nftByCollectionList/:ids
- nftByIssuer/:issuer
- nftByCid/:id
- nftByOwner/:owner
- nftCollectedBy/:address
- nftSoldBy/:address

#### ⚠️ Caveats

REST implementation supports only functions that requires exactly one parameter.
Please open a pull-request if you know how to fix this

### ✔️  Missing functions

- collectionStatListById - returns collection metrics by id
- eventListByCollectionId - returns events for NFTs by collection id
- eventListByCollectionIdAndInteraction - returns events for NFTs by collection id and interaction
- lastNftIdbyCollectionId - returns last token id for collection by id

## Development 💻

- Clone this repository
```bash
git clone https://github.com/kodadot/packages.git

```

- Navigate to the packages directory
```bash
cd packages/uniquery
```

- Enable [Corepack](https://github.com/nodejs/corepack) by running:

```bash
corepack enable
```

or

```bash
npm i -g corepack
```

- Install Dependencies
```bash
pnpm install
```
- Run interactive tests

```bash
pnpm dev
```

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kodadot1/uniquery?style=flat-square
[npm-version-href]: https://npmjs.com/package/@kodadot1/uniquery

[npm-downloads-src]: https://img.shields.io/npm/dm/@kodadot1/uniquery?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@kodadot1/uniquery

[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/@kodadot1/uniquery/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/@kodadot1/uniquery/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@kodadot1/uniquery/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/@kodadot1/uniquery
