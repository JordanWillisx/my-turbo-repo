FROM node:20 AS base

#Step 1: Build API-Bun Binary
FROM oven/bun:latest AS build

WORKDIR /app

COPY package.json bun*.lockb ./

COPY . .

RUN bun install --verbose --frozen-lockfile

# compile everything to a binary
RUN bun build ./apps/api/src/index.ts --outdir ./apps/out 

## Step 2: Run Bun Server
FROM base AS runner

RUN npm install -g bun

WORKDIR /app

## Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

## copy the compiled binary from the build image
COPY --from=build --chown=api:nodejs /app/apps/out/index.js ./apps/api/src/index.js

RUN ls -la ./apps

EXPOSE 2999

## execute the binary!
CMD ["bun","run","./apps/api/src/index.js"]