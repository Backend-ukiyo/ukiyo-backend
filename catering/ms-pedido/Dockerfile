# --- STAGE 1: BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Configuración Monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Librería Common
COPY common ./common

# 3. Código del MICROSERVICIO
COPY catering/ms-pedido ./catering/ms-pedido

# 4. Install & Build
RUN pnpm install --frozen-lockfile

WORKDIR /app/common
RUN pnpm run build

# 5. Build del Servicio
WORKDIR /app/catering/ms-pedido
RUN ../../node_modules/.bin/nest build

# --- STAGE 2: RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 6. Copiar dependencias y dist
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/catering/ms-pedido/dist ./dist

CMD ["node", "dist/main.js"]