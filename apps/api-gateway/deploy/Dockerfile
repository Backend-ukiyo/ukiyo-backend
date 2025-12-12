FROM node:20-alpine

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
WORKDIR /app

# Copiar archivos de configuración
COPY ${APP_MS}/deploy/start.sh .
COPY ./package.json .
COPY ./pnpm-workspace.yaml .
COPY ./pnpm-lock.yaml .
COPY ./.npmrc .
COPY ./tsconfig.json .
COPY ./nest-cli.json .

# Copiar código fuente
COPY ./libs ./libs
COPY ./apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Exponer puerto
EXPOSE 3000

CMD ["./start.sh"]