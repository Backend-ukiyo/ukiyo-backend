# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar archivos de configuración
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nest-cli.json tsconfig.json tsconfig.build.json ./

# 2. Copiar código fuente completo
COPY libs ./libs
COPY apps ./apps

# 3. Instalar dependencias
RUN pnpm install --frozen-lockfile

# --- CAMBIO CRÍTICO AQUÍ: EL ORDEN ---

# 4. PRIMERO: Construir el microservicio (Esto limpiará la carpeta /dist por el "deleteOutDir": true)
WORKDIR /app
RUN npx nest build ms-usuarios

# 5. SEGUNDO: Construir la librería Common (Esto agregará la lib a /dist sin borrar lo de ms-usuarios)
WORKDIR /app/libs/common
RUN pnpm run build

# -------------------------------------

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 6. Copiar dependencias (incluye los symlinks)
COPY --from=builder /app/node_modules ./node_modules

# 7. Copiar el build de la aplicación
# (Según tus logs anteriores, Nest mantiene la estructura anidada)
COPY --from=builder /app/dist/apps/ms-usuarios ./dist/apps/ms-usuarios

# 8. Copiar la librería compartida y su compilado
# A. La estructura de la lib
COPY --from=builder /app/libs/common ./libs/common
# B. El compilado de la lib (ahora sí existirá porque lo construimos al final)
COPY --from=builder /app/dist/libs/common ./libs/common/dist

# 9. Comando de arranque
CMD ["node", "dist/apps/ms-usuarios/src/main.js"]