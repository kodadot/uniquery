# @kodadot1/uniquery
---

Universal GraphQL query builder for KodaDot

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]

> GraphQL builder for KodaDot API

![image](https://user-images.githubusercontent.com/5887929/217076647-3edd6aef-5b18-42e6-9a35-8bd2cf7c1ad6.png)


## Usage

Add Uniquery to your project

```sh
# with npm
npm install @kodadot1/uniquery

# with yarn
yarn add @kodadot1/uniquery

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
query itemListByCollectionIdList {
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
const query = client.itemListByCollectionId(id)
```

**To be aware every client function returns `GraphQuery` object**

This `GraphQuery` object represents a GraphQL query that should be passed to your preffered `fetch` library (`fetch`, `axios`, `ohmyfetch`)

> **Note:** Uniquery is not a GraphQL client. It's a tool to help you build GraphQL queries
> It's possible to use it with any GraphQL client (such as Apollo)


We have currently two implementations
- 1. Client

```js
import { getClient } from '@kodadot1/uniquery'

const client = getClient('bsx')
const id = '2305670031'
const query = client.collectionById(id)
const result = await client.fetch(query)
```

> ⚠️: If you want to use `.fetch` method on client, you need to pass chain prefix as parameter

- 2. REST

```js
import { ask } from '@kodadot1/uniquery'
const id = '2305670031'
const result = await ask(`/bsx/itemByCollection/${id}`)
```


## ⚓️ Exported functions

### ✔️  Uniquery

- `extendFields` - extends default list with newly provided values
- `getClient` - returns GrahpQL query builder
- `getUrl` - returns GrahpQL indexer url
- `SquidClient` - returns SquidClient instance

From REST:

- `ask` - obtain data from GraphQL indexer by selected route
- `pathToRequest` - converts route to corresponding GraphQL query


### ✔️  Uniquery.client

- collectionById - returns collection by id
- collectionListByIssuer - returns collections where issuer (creator) is equal to provided address
- collectionListByName - returns collections where name contains provided name
- collectionListByOwner - returns collections where owner is equal to provided address
- eventList - returns all events
- eventListByAddress - returns events by address
- eventListByCollectionId - returns events for nfts that belong to collection
- eventListByCollectionIdAndInteraction - returns events for nfts that belong to collection and interaction
- eventListByCollectionIdAndInteractionList - returns events for nfts that belong to collection and list of interactions
- eventListByInteraction - returns events by interaction
- eventListByItemId - returns events by nft id
- eventListByItemIdAndInteraction - returns events by nft id and interaction
- eventListByItemIdAndInteractionList - returns events by nft id and list of interactions
- itemById - returns NFT by id
- itemListByCollectionId - returns NFTs where collection id is equal to provided id
- itemListByCollectionIdAndOwner - returns NFTs where collection id is equal to provided id and owner is equal to provided address
- itemListByCollectionIdList - return list of NFTs by list of collectionIds
- itemListByIssuer - returns NFTs where issuer (creator) is equal to provided address
- itemListByName - returns NFTs where name contains provided name
- itemListByMetadataId - returns NFTs where metadata is equal to provided uri
- itemListByMetadataIdMatch -returns NFTs where metadata can match provided CID
- itemListByOwner - returns NFTs where owner is equal to provided address
- itemListCollectedBy - returns NFTs where owner is equal to provided address however it's not the issuer of the NFT
- itemListForSale - returns NFTs where price is greater than 0
- itemListForSaleByCollectionId - returns NFTs where price is greater than 0 and belong to particular collection
- itemListSoldBy - no idea :shrug:
- fetch<D> - generic function to fetch data from provided query

### ✔️  REST

- collection/:id
- collectionByIssuer/:issuer
- collectionByOwner/:owner
- eventByAddress/:address
- eventByInteraction/:interaction
- eventByNftId/:id
- item/:id
- itemByCollection/:id
- itemByCollectionList/:ids
- itemByIssuer/:issuer
- itemByCid/:id
- itemByOwner/:owner
- itemCollectedBy/:address
- itemSoldBy/:address

#### ⚠️ Caveats

REST implementation supports only functions that requires exactly one parameter.
Please open a pull-request if you know how to fix this

### ✔️  Missing functions

- collectionStatListById - returns collection metrics by id
- lastNftIdbyCollectionId - returns last token id for collection by id

## Development 💻

- Clone this repository
```bash
git clone https://github.com/kodadot/uniquery.git

```

- Navigate to the packages directory
```bash
cd uniquery
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

[github-actions-src]: https://img.shields.io/github/actions/workflow/status/kodadot/uniquery/ci.yml?branch=main
[github-actions-href]: https://github.com/kodadot/uniquery/actions?query=workflow%3Aci

