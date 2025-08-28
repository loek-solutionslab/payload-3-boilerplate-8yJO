#!/bin/sh

echo "🚀 Starting Railway deployment..."
echo "Environment: NODE_ENV=${NODE_ENV:-development}"
echo "Port: ${PORT:-3000}"
echo "Hostname: ${HOSTNAME:-localhost}"

# Handle Railway volume permissions for media directory
if [ -d "/app/public/media/lost+found" ]; then
    echo "🗂️  Removing lost+found directory created by mounted volume..."
    rm -rf "/app/public/media/lost+found" || echo "⚠️  Could not remove lost+found directory (this is usually fine)"
fi

# In production, skip migrations as they should already be completed
# The database schema has been fixed and migrations were run during the build process
if [ "$NODE_ENV" = "production" ]; then
    echo "ℹ️ Production environment detected - skipping migrations (already completed during build)"
else
    # Only run migrations in development
    if [ -f "scripts/migrate.js" ]; then
        echo "🔄 Running database migrations..."
        node scripts/migrate.js
        
        if [ $? -ne 0 ]; then
            echo "❌ Migration failed, exiting..."
            exit 1
        fi
        
        echo "✅ Migrations completed successfully"
    else
        echo "ℹ️ Migration script not found, skipping migrations"
    fi
fi

# Check if server.js exists and start the server
if [ -f "server.js" ]; then
    echo "🌟 Starting Next.js server on port ${PORT:-3000}..."
    exec node server.js
else
    echo "❌ server.js not found! Directory contents:"
    ls -la
    exit 1
fi