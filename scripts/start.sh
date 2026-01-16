#!/bin/sh
set -e

API_PORT=${API_PORT:-4000}
NEXT_PORT=${NEXT_PORT:-3000}
NODE_ENV=${NODE_ENV:-production}

# Start Express API
PORT="$API_PORT" node server/index.js &
API_PID=$!

# Start Next.js (expects .next from `npm run build`)
PORT="$NEXT_PORT" next start -p "$NEXT_PORT"

wait "$API_PID"
