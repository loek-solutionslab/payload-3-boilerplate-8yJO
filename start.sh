#!/bin/sh

echo "🚀 Starting Railway deployment..."
echo "Environment: NODE_ENV=${NODE_ENV:-development}"
echo "Port: ${PORT:-3000}"
echo "Hostname: ${HOSTNAME:-localhost}"

# List contents for debugging
echo "📂 Current directory contents:"
ls -la

# Check if migration script exists
if [ -f "scripts/migrate.js" ]; then
    echo "🔄 Running database migrations..."
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

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "🌟 Starting Next.js server on port ${PORT:-3000}..."
    exec node server.js
else
    echo "❌ server.js not found! Contents:"
    find . -name "*.js" -type f | head -10
    exit 1
fi