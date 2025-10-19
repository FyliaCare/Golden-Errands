# Golden Errands Backend - Railway Deployment
# Multi-stage build for Node.js TypeScript application

FROM node:18-alpine AS builder

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install ALL dependencies (including dev dependencies for building)
RUN npm ci

# Copy Prisma schema first
COPY backend/prisma ./prisma

# Generate Prisma Client with placeholder DATABASE_URL for build
ENV DATABASE_URL="postgresql://placeholder:placeholder@placeholder:5432/placeholder?schema=public"
RUN npx prisma generate

# Copy backend source code
COPY backend/ ./

# Build TypeScript (Prisma types now available)
RUN npm run build

# Production stage
FROM node:18-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install ALL dependencies (Prisma CLI needed for migrations)
RUN npm ci

# Copy Prisma schema for runtime generation
COPY backend/prisma ./prisma

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy startup script
COPY backend/start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose port (Railway will set PORT env var)
EXPOSE 4000

# Use startup script which handles Prisma generation and migrations
# Real DATABASE_URL will be injected by Railway at runtime
CMD ["./start.sh"]
