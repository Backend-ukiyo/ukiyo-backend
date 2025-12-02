# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar archivos de configuración
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nest-cli.json tsconfig.json tsconfig.build.json ./

# 2. Copiar código fuente
COPY libs ./libs
COPY apps ./apps

# 3. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 4. Construir la librería Common
WORKDIR /app/libs/common
RUN pnpm run build

# 5. Construir el microservicio desde la raíz
WORKDIR /app
RUN npx nest build ms-usuarios

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 6. Copiar dependencias (incluye los symlinks)
COPY --from=builder /app/node_modules ./node_modules

# 7. Copiar el build de la aplicación (ms-usuarios)
# NOTA: Según tu log, Nest mantiene la estructura de carpetas, así que copiamos todo el bloque.
COPY --from=builder /app/dist/apps/ms-usuarios ./dist/apps/ms-usuarios

# --- AQUÍ ESTÁ LA SOLUCIÓN AL ERROR ACTUAL ---
# 8. Restaurar la librería compartida para que el symlink funcione
# A. Copiamos la estructura base (package.json, etc.)
COPY --from=builder /app/libs/common ./libs/common

# B. Copiamos el compilado de la lib (dist) DENTRO de la carpeta de la lib
#    Esto es necesario porque el package.json de la lib busca "dist/index.js" relativo a sí mismo.
COPY --from=builder /app/dist/libs/common ./libs/common/dist
# ---------------------------------------------

# 9. Comando de arranque
# Ajustado a la ruta que vimos en tu log de error (que prueba que esta ruta sí existe)
CMD ["node", "dist/apps/ms-usuarios/src/main.js"]