#!/usr/bin/env just --justfile

build:
  pnpm build

link:
  pnpm link

publish:
  pnpm publish --access public

c VERSION:
  git commit -am ":bookmark: uniquery@{{VERSION}}"

up: build publish

update-deps:
  npx npm-check-updates -u
