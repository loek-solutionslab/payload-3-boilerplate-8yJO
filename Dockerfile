FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_MIGRATE_SKIP_PROMPT=true

# Accept build args for database connection
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL

# Set them as environment variables
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Run build without migrations (they'll run at startup)
RUN npm run build:docker

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_MIGRATE_SKIP_PROMPT=true

# Install su-exec for user switching
RUN apk add --no-cache su-exec

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy migration script and startup script
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh
RUN chmod +x ./start.sh

# Create media directory and ensure proper permissions
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public

# Don't switch to nextjs user yet - we need root for volume permissions
# USER nextjs will be handled in start.sh after fixing permissions

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["/bin/sh", "./start.sh"]