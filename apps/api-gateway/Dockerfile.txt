# --- STAGE 1: BUILDER (Igual que antes) ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY libs/common ./libs/common
COPY apps/api-gateway ./apps/api-gateway

RUN pnpm install --frozen-lockfile

# Construimos Common y luego Gateway
WORKDIR /app/libs/common
RUN pnpm run build
WORKDIR /app/apps/api-gateway
RUN ../../node_modules/.bin/nest build

# --- STAGE 2: RUNNER (Producción) ---
FROM node:20-alpine AS runner
WORKDIR /app

# 1. Copiar dependencias
COPY --from=builder /app/node_modules ./node_modules

# 2. Copiar TODO el dist generado (para no fallar con las rutas)
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/apps/api-gateway/src/main.js"]