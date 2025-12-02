# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar TODO el contexto necesario
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nest-cli.json tsconfig.json tsconfig.build.json ./
COPY libs ./libs
COPY apps ./apps

# 2. Instalar dependencias
RUN pnpm install --frozen-lockfile

# --- EL FIX DEFINITIVO (ORDEN Y COMANDOS EXPLÍCITOS) ---

# 3. Construir la APP primero
# Esto borrará la carpeta dist (deleteOutDir: true), por eso va primero.
# Usamos npx nest para asegurarnos de usar el binario local.
RUN npx nest build ms-usuarios

# 4. Construir la LIBRERÍA "Common" manualmente usando TSC
# Usamos el compilador de TypeScript directo apuntando al config de la librería.
# Esto generará los archivos en /app/dist/libs/common sin borrar lo anterior.
RUN npx tsc -p libs/common/tsconfig.lib.json

# -------------------------------------------------------

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 5. Copiar node_modules (con los enlaces simbólicos)
COPY --from=builder /app/node_modules ./node_modules

# 6. Copiar el build de la APP (ms-usuarios)
# NestJS estándar coloca el build en dist/apps/ms-usuarios.
# Lo movemos a ./dist para que quede en la raíz del contenedor.
COPY --from=builder /app/dist/apps/ms-usuarios ./dist

# 7. REPARAR LA LIBRERÍA (El paso mágico)
# A. Restaurar la carpeta física de la librería (para que el symlink la encuentre)
COPY --from=builder /app/libs/common ./libs/common

# B. Inyectar el código compilado de la librería en su lugar correcto
# En el builder se generó en: /app/dist/libs/common
# El package.json de la lib espera encontrarlo en: ./libs/common/dist
COPY --from=builder /app/dist/libs/common ./libs/common/dist

# 8. Comando de arranque
# Al copiar a ./dist en el paso 6, el main.js queda aquí:
CMD ["node", "dist/main.js"]