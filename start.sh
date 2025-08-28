#!/bin/sh

# Run migrations first
echo "Running database migrations..."
node scripts/migrate.js

# Start the server
echo "Starting server..."
exec node server.js