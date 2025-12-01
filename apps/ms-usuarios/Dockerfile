# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar configuración
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json nest-cli.json ./

# 2. Copiar librería
COPY libs/common ./libs/common

# 3. Copiar servicio
COPY apps/ms-usuarios ./apps/ms-usuarios

# 4. Instalar
RUN pnpm install --frozen-lockfile

# 5. Construir Common (Desde la raíz usando filtro)
RUN pnpm --filter @ukiyo/common run build

# 6. Construir el Microservicio
RUN pnpm --filter ms-usuarios run build

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 7. Copiar dependencias
COPY --from=builder /app/node_modules ./node_modules

# 8. Copiar desde la ruta estándar
COPY --from=builder /app/dist/apps/ms-usuarios ./dist

CMD ["node", "dist/apps/ms-usuarios/src/main.js"]