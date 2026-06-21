FROM oven/bun:1-alpine

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile 2>/dev/null || bun install

# Copy server code
COPY index.ts .

# Amvera provides PORT env variable — server reads it
# Default is 3042 for local development
ENV PORT=3042
EXPOSE 3042

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://0.0.0.0:${PORT}/health || exit 1

# Start server
CMD ["bun", "run", "index.ts"]
