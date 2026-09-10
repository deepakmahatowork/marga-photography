# Multi-stage Dockerfile for Marga Photography (Astro Node Standalone)

# Stage 1: Build environment
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Production runtime environment
FROM node:22-alpine AS runner
WORKDIR /app

# Set node environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copy dependency manifests and install production-only packages
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built server entrypoints from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 4321

# Execute standalone Node server
CMD ["node", "./dist/server/entry.mjs"]
