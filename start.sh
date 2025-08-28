#!/bin/sh

# Run migrations first
echo "Running database migrations..."
node scripts/migrate.js

# Check if migration was successful
if [ $? -ne 0 ]; then
    echo "❌ Migration failed, exiting..."
    exit 1
fi

echo "✅ Migrations completed successfully"

# Start the server
echo "Starting server..."
exec node server.js