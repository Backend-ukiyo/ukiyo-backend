FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY common ./common

COPY delivery/usuarios ./delivery/usuarios

RUN pnpm install --frozen-lockfile

WORKDIR /app/common
RUN pnpm run build

WORKDIR /app/delivery/usuarios
RUN ../../node_modules/.bin/nest build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/delivery/usuarios/dist ./dist

CMD ["node", "dist/main.js"]