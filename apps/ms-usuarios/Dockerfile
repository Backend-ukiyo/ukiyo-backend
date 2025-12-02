# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar archivos de configuración del Monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nest-cli.json tsconfig.json tsconfig.build.json ./

# 2. Copiar todo el código fuente (libs y apps)
# Es necesario copiar todo para que el monorepo resuelva las dependencias cruzadas correctamente al compilar
COPY libs ./libs
COPY apps ./apps

# 3. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 4. Construir la librería compartida (Common)
# Nota: Si tu build de ms-usuarios ya compila las dependencias, este paso podría ser opcional, 
# pero es más seguro hacerlo explícito.
WORKDIR /app/libs/common
RUN pnpm run build

# 5. VOLVER A LA RAÍZ y construir el microservicio usando la CLI global del proyecto
WORKDIR /app
# Esto usará el nest-cli.json de la raíz para generar el dist en /app/dist/apps/ms-usuarios
RUN npx nest build ms-usuarios

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 6. Copiar dependencias de producción
COPY --from=builder /app/node_modules ./node_modules

# 7. Copiar el build generado
# Al construir desde la raíz, NestJS garantiza que esta ruta exista
COPY --from=builder /app/dist/apps/ms-usuarios ./dist

# 8. Comando de arranque
# Basado en tu imagen del árbol de directorios (la estructura anidada rara):
# dist -> apps -> ms-usuarios -> src -> main.js
# Como copiamos "/app/dist/apps/ms-usuarios" dentro de "./dist", la ruta se mantiene relativa:
CMD ["node", "dist/main.js"]