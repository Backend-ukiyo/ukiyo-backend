# Build stage
FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
# Instalar git en Alpine --> usa sh
# RUN apt update && apt install -yq --no-install-recommends git
#       git curl

WORKDIR /app

# Instalar pnpm y openssl
RUN npm install -g pnpm
RUN apk add --no-cache openssl

COPY ${APP_MS}/deploy/start.sh .
COPY ./package.json .
COPY ./pnpm-workspace.yaml .
COPY ./pnpm-lock.yaml .
COPY ./.npmrc .
COPY ./tsconfig.json .
COPY ./nest-cli.json .

RUN pnpm install

COPY ./libs ./libs
COPY ./apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Generar el Cliente de Prisma
RUN cd apps/${MICROSERVICIO} && npx prisma generate

# Construir el microservicio
RUN pnpm build ${MICROSERVICIO}

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# Copiar dependencias y build desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
# Necesitamos el schema en producción para las migraciones (opcional si usas start.sh)
COPY --from=builder /app/apps/${MICROSERVICIO}/prisma ./apps/${MICROSERVICIO}/prisma

# Exponer el puerto
EXPOSE 3001

# # RUN chmod +x ./start.sh
# EXPOSE 3000

# # ENTRYPOINT ["./start.sh"]
CMD ["tail", "-f", "/dev/null"]