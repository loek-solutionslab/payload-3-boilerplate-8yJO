#!/bin/sh

# Check if migration script exists
if [ -f "scripts/migrate.js" ]; then
    echo "Running database migrations..."
    node scripts/migrate.js
    
    # Check if migration was successful
    if [ $? -ne 0 ]; then
        echo "❌ Migration failed, exiting..."
        exit 1
    fi
    
    echo "✅ Migrations completed successfully"
else
    echo "ℹ️ Migration script not found in production build, skipping migrations"
fi

# Start the server
echo "Starting server on port ${PORT:-3000}..."
exec node server.js