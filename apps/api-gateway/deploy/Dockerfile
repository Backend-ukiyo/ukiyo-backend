# Build stage
FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar configuración
COPY ${APP_MS}/deploy/start.sh .
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY .npmrc .
COPY tsconfig.json .
COPY nest-cli.json .

# Instalar
RUN pnpm install

# Copiar código
COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Construir
RUN pnpm build ${MICROSERVICIO}

EXPOSE 3000

# Arrancamos el Gateway automáticamente
CMD ["node", "dist/apps/api-gateway/main.js"]