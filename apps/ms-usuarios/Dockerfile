# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY libs/common ./libs/common
COPY apps/ms-usuarios ./apps/ms-usuarios

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @ukiyo/common run build
RUN pnpm --filter ms-usuarios run build
RUN find /app -name "main.js" -type f

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs ./libs
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/ms-usuarios/package.json ./package.json

CMD ["node", "dist/apps/ms-usuarios/apps/ms-usuarios/src/main.js"]
