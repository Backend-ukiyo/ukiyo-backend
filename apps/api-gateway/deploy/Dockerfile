# Build stage
FROM node:20-alpine AS builder

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
WORKDIR /app

RUN npm install -g pnpm

COPY ${APP_MS}/deploy/start.sh .
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY .npmrc .
COPY tsconfig.json .
COPY nest-cli.json .

RUN pnpm install

COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

RUN pnpm build ${MICROSERVICIO}

# # Runner stage
# FROM node:20-alpine AS runner
# WORKDIR /app
# RUN npm install -g pnpm

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package.json ./

EXPOSE 3000

# CMD ["node", "dist/apps/api-gateway/src/main.js"]
CMD ["tail", "-f", "/dev/null"]