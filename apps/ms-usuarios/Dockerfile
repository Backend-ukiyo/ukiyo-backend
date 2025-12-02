# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY libs/common ./libs/common
COPY apps/ms-usuarios ./apps/ms-usuarios

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @ukiyo/common run build
RUN pnpm --filter ms-usuarios run build
RUN find /app -name "main.js" -type f

WORKDIR /app/apps/ms-usuarios
RUN ../../node_modules/.bin/nest build

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 1. Copiar node_modules
COPY --from=builder /app/node_modules ./node_modules

# 2. Copiar TODO el dist generado (más seguro para depurar)
COPY --from=builder dist ./dist

# 3. Ajustar el comando de arranque
CMD ["node", "dist/apps/ms-usuarios/apps/ms-usuarios/src/main.js"]
