# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Build Next.js assets
RUN npm run build

# Production runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy prepared app from builder
COPY --from=builder /app .
RUN chmod +x scripts/start.sh

# Expose Next.js (3000) and Express (4000)
EXPOSE 3000
EXPOSE 4000

CMD ["npm", "run", "start:container"]
