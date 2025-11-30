# --- STAGE 1: BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# Configuración y Common
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY common ./common

# Código Específico (MS-CLIENTES)
COPY delivery/ms-clientes ./delivery/ms-clientes

# Instalación y Build
RUN pnpm install --frozen-lockfile

WORKDIR /app/common
RUN pnpm run build

WORKDIR /app/delivery/ms-clientes
RUN ../../node_modules/.bin/nest build

# --- STAGE 2: RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/delivery/ms-clientes/dist ./dist

CMD ["node", "dist/main.js"]