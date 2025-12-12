FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.json nest-cli.json ./

# Copiar código fuente
COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Exponer puerto
EXPOSE 3000

CMD ["sh", "start.sh"]