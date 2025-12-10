# Build stage
FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
# Instalar git en Alpine --> usa sh
# RUN apt update && apt install -yq --no-install-recommends git
#       git curl

WORKDIR /app
COPY ${APP_MS}/deploy/start.sh .
COPY ./package.json .
COPY ./pnpm-workspace.yaml .
COPY ./pnpm-lock.yaml .
COPY ./.npmrc .
COPY ./tsconfig.json .
COPY ./nest-cli.json .

COPY ./libs ./libs
COPY ./apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# RUN chmod +x ./start.sh
EXPOSE 3000

# ENTRYPOINT ["./start.sh"]
CMD ["tail", "-f", "/dev/null"]