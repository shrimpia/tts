#!/bin/sh

corepack enable pnpm
corepack prepare

pnpm run migrate:up

if [ "$NODE_ENV" = "production" ]; then
  pnpm run start
else
  pnpm run dev
fi
