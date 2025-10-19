# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy backend source
COPY backend/src ./src/
COPY backend/tsconfig.json ./

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# Remove devDependencies after build
RUN npm ci --only=production && npm cache clean --force

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]