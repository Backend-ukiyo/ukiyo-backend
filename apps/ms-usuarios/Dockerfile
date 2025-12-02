# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar configuración del Monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copiar librerías y el servicio específico
COPY libs/common ./libs/common
COPY apps/ms-usuarios ./apps/ms-usuarios

# 3. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 4. Construir Common (dependencia necesaria)
WORKDIR /app/libs/common
RUN pnpm run build

# 5. Construir ms-usuarios
WORKDIR /app/apps/ms-usuarios
RUN ../../node_modules/.bin/nest build

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 6. Copiar node_modules de producción
COPY --from=builder /app/node_modules ./node_modules

# 7. COPIA CRÍTICA: Traemos la carpeta compilada
# En el builder, el output está en: /app/dist/apps/ms-usuarios
# Lo copiamos a ./dist en el runner.
COPY --from=builder /app/dist/apps/ms-usuarios ./dist

# 8. COMANDO FINAL AJUSTADO A TU IMAGEN
# Según tu imagen, dentro de la carpeta 'dist' se replica la estructura 'apps/ms-usuarios/src'
CMD ["node", "dist/apps/ms-usuarios/src/main.js"]