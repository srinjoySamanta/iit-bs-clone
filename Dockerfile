# Multi-Stage Production Dockerfile for IIT Kharagpur BS Portal Full-Stack
# Stage 1: Build the optimized Vite React Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Express REST API Backend + Static Production Hosting
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy server package definitions and install production dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy backend application code and schema
COPY server/ ./server/

# Copy compiled frontend from Stage 1 into server's static dist directory
COPY --from=frontend-builder /app/dist ./server/dist

# Expose backend REST API & static server port
EXPOSE 5000

# Set working directory to server
WORKDIR /app/server

# Container healthcheck testing /api/health
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start production full-stack server
CMD ["node", "server.js"]
