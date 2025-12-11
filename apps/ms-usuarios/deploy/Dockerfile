FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm
RUN apk add --no-cache openssl

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.json nest-cli.json ./

# Copiar código fuente
COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Exponer puerto
EXPOSE 3001

CMD ["tail", "-f", "/dev/null"]