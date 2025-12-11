# Build stage
FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

# Instalar pnpm y dependencias del sistema (openssl para Prisma)
RUN npm install -g pnpm
RUN apk add --no-cache openssl

# Copiar configuración
COPY ${APP_MS}/deploy/start.sh .
COPY ./package.json .
COPY ./pnpm-workspace.yaml .
COPY ./pnpm-lock.yaml .
COPY ./.npmrc .
COPY ./tsconfig.json .
COPY ./nest-cli.json .

# Instalar dependencias
RUN pnpm install

# Copiar código
COPY ./libs ./libs
COPY ./apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Generar Prisma
RUN cd apps/${MICROSERVICIO} && npx prisma generate

# Construir
RUN pnpm build ${MICROSERVICIO}

EXPOSE 3001

# En vez de 'tail -f', arrancamos la app construida directamente
CMD ["node", "dist/apps/ms-usuarios/main.js"]