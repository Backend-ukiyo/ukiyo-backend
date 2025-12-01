# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar configuración raíz
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copiar librería común
COPY libs/common ./libs/common

# 3. Copiar microservicio
COPY apps/ms-usuarios ./apps/ms-usuarios

# 4. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 5. Construir librería común
RUN pnpm --filter @ukiyo/common run build

# 6. Construir microservicio
RUN pnpm --filter ms-usuarios run build

# Verificar estructura (debug)
RUN ls -la /app/dist/apps/ms-usuarios || echo "No existe dist/apps/ms-usuarios"

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 7. Copiar node_modules y libs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs ./libs

# 8. Copiar build del microservicio
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/ms-usuarios/package.json ./package.json

CMD ["node", "dist/apps/ms-usuarios/apps/ms-usuarios/src/main.js"]
