# NEXT PROJECT GUIDELINES

## 🚨 LESSONS LEARNED FROM DEPLOYMENT HELL

This document captures critical lessons learned from resolving 30+ failed Railway deployments. Use this as a checklist for future projects to avoid similar nightmares.

## 🔥 DEPLOYMENT DISASTER PREVENTION CHECKLIST

### 1. Database Schema Consistency
**PROBLEM**: Mixed camelCase (`pages__blocks_relumeTeam`) and snake_case (`pages_blocks_relume_team`) table naming caused Payload CMS query conflicts.

**PREVENTION**:
- [ ] **Always use consistent naming conventions** from day one
- [ ] **Configure Payload to use snake_case naming** in payload.config.ts
- [ ] **Run schema analysis BEFORE first production deployment**
- [ ] **Test database queries locally with production-like data**
- [ ] **Never mix naming conventions** in the same database

```bash
# Run this BEFORE production deployment
node scripts/complete-schema-analysis.js
```

### 2. Railway Volume Mount Permissions
**PROBLEM**: Railway creates `lost+found` directories with root permissions that Next.js can't access, causing EACCES errors and restart loops.

**PREVENTION**:
- [ ] **Always handle volume permissions in Docker startup**
- [ ] **Start container as root, fix permissions, then switch to app user**
- [ ] **Install su-exec for secure privilege dropping**
- [ ] **Test volume mounts in development with similar permissions**

**Required Docker pattern**:
```dockerfile
# Install su-exec for user switching
RUN apk add --no-cache su-exec

# Don't switch to non-root user in Dockerfile
# Handle user switching in startup script after fixing permissions
```

**Required startup script pattern**:
```bash
# Fix volume permissions as root
chmod -R 755 /app/public/media/lost+found 2>/dev/null || rm -rf /app/public/media/lost+found
chown -R nextjs:nodejs /app/public/media

# Switch to non-root user for security
exec su-exec nextjs:nodejs node server.js
```

### 3. Environment-Aware Migration Strategy
**PROBLEM**: Production containers tried to run migrations with missing dependencies (dotenv) causing startup failures.

**PREVENTION**:
- [ ] **Migrations should run during build, not runtime in production**
- [ ] **Skip migrations in production environment startup**
- [ ] **Set PAYLOAD_MIGRATE_SKIP_PROMPT=true in production**
- [ ] **Test migration strategy in staging environment first**

```bash
# Production startup logic
if [ "$NODE_ENV" = "production" ]; then
    echo "Production - skipping migrations"
else
    # Run migrations in development only
    node scripts/migrate.js
fi
```

### 4. Container Architecture Best Practices
**PREVENTION**:
- [ ] **Multi-stage Docker builds** to reduce production image size
- [ ] **Separate build and runtime environments**
- [ ] **Use Alpine Linux for smaller images**
- [ ] **Copy only necessary files to production stage**
- [ ] **Set proper health checks**

### 5. Dependency Management
**PROBLEM**: Next.js standalone builds don't include all node_modules, causing missing dependencies.

**PREVENTION**:
- [ ] **Understand Next.js standalone output behavior**
- [ ] **Keep production scripts minimal and dependency-free**
- [ ] **Test production builds locally before deployment**
- [ ] **Use environment variables instead of config files in production**

### 6. Debugging & Monitoring
**PREVENTION**:
- [ ] **Add comprehensive logging to startup scripts**
- [ ] **Include health check endpoints**
- [ ] **Use structured logging for easier debugging**
- [ ] **Monitor container restart patterns**
- [ ] **Set up alerts for deployment failures**

## 🛠️ PRE-DEPLOYMENT CHECKLIST

Before deploying ANY Payload CMS + Railway project:

### Database
- [ ] Run complete schema analysis
- [ ] Verify naming conventions consistency
- [ ] Test all Payload block queries
- [ ] Check foreign key relationships
- [ ] Validate migration scripts

### Container
- [ ] Test Docker build locally
- [ ] Verify volume mount handling
- [ ] Test permission scenarios
- [ ] Validate user switching
- [ ] Check startup script execution

### Environment
- [ ] Set all required environment variables
- [ ] Configure PAYLOAD_MIGRATE_SKIP_PROMPT=true
- [ ] Test production vs development behavior
- [ ] Validate health checks
- [ ] Configure proper restart policies

### Railway Platform
- [ ] Configure volumes correctly
- [ ] Set appropriate resource limits
- [ ] Configure health check paths
- [ ] Set proper environment variables
- [ ] Test deployment rollbacks

## 🚨 WARNING SIGNS TO WATCH FOR

If you see these patterns, STOP and investigate:

1. **Mixed table naming** in database schema analysis
2. **Permission denied errors** on volume-mounted directories  
3. **Missing dependencies** in production container startup
4. **Container restart loops** without clear error messages
5. **Build timeouts** during migration steps

## 📋 QUICK DIAGNOSTIC COMMANDS

When things go wrong:

```bash
# Analyze database schema
node scripts/complete-schema-analysis.js

# Test Docker build locally
docker build -t test-app .
docker run --rm test-app

# Check volume permissions
ls -la /app/public/media/

# Test production environment locally
NODE_ENV=production npm run build
```

## 🎯 GOLDEN RULES

1. **NEVER** mix naming conventions in the same database
2. **ALWAYS** handle volume permissions as root before switching users
3. **ALWAYS** skip migrations in production runtime
4. **ALWAYS** test production builds locally first
5. **NEVER** assume Railway volumes work like local directories

## 💡 SUCCESS PATTERNS THAT WORK

- **Snake_case naming** for database tables consistently
- **Root startup with user switching** for permission handling
- **Environment-aware logic** for migrations
- **Comprehensive logging** for debugging
- **Multi-stage Docker builds** for optimization

---

**Remember**: The 30+ deployment failures taught us these lessons the hard way. Use this knowledge to save future projects from deployment hell! 🔥➡️✅