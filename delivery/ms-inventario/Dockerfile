# --- STAGE 1: BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# Configuración y Common
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY common ./common

# Código Específico
COPY delivery/ms-inventario ./delivery/ms-inventario

# Instalación y Build
RUN pnpm install --frozen-lockfile

WORKDIR /app/common
RUN pnpm run build

# Build del Servicio
WORKDIR /app/delivery/ms-inventario
RUN ../../node_modules/.bin/nest build

# --- STAGE 2: RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# Copiar dependencias
COPY --from=builder /app/node_modules ./node_modules

# Copiar build 
COPY --from=builder /app/delivery/ms-inventario/dist ./dist

CMD ["node", "dist/main.js"]