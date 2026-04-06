# Stage 1: Build
FROM node:22-alpine AS build

RUN apk upgrade --no-cache

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Stage 2: Serve
FROM nginx:alpine-slim

RUN apk upgrade --no-cache

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy env injection script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Create empty env-config.js (will be overwritten at runtime by env.sh)
RUN echo "window.__ENV = {};" > /usr/share/nginx/html/env-config.js

EXPOSE 80

# Nginx docker image already runs scripts in /docker-entrypoint.d/ on start
CMD ["nginx", "-g", "daemon off;"]
