# --- STAGE 1: BUILDER ---
FROM node:20-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# 1. Copiar archivos de configuración del Monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copiar la librería compartida
COPY common ./common

# 3. Copiar el código fuente del GATEWAY
COPY delivery/api-gateway ./delivery/api-gateway

# 4. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 5. Construir Common
WORKDIR /app/common
RUN pnpm run build

# 6. Construir el Gateway
WORKDIR /app/delivery/api-gateway
RUN ../../node_modules/.bin/nest build

# --- STAGE 2: RUNNER ---
FROM node:20-alpine AS runner

WORKDIR /app

# 7. Copiar dependencias y build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/delivery/api-gateway/dist ./dist

# 8. Arrancar
CMD ["node", "dist/main.js"]