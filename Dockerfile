# Production Dockerfile for Google Cloud Run (24/7 Auto-healing Container)
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Nginx Production Server
FROM nginx:alpine

# Copy custom nginx configuration for Cloud Run ($PORT support & SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Cloud Run default port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
