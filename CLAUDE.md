# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Start development server (port 3000)
pnpm dev

# Build for production (runs migrations first)
pnpm build

# Start production server
pnpm start

# Test production build locally
pnpm dev:prod
```

### Code Quality
```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Generate TypeScript types from Payload schema
pnpm generate:types

# Generate import map for Payload admin
pnpm generate:importmap
```

### Database
```bash
# Run migrations
pnpm payload migrate

# Create new migration
pnpm payload migrate:create migration_name

# Access Payload CLI
pnpm payload [command]
```

### Production Build & Migrations

When deploying to production environments (Railway, Vercel, etc.), the build process may prompt for migration confirmation. To handle this:

1. **Set environment variable in production:**
   ```bash
   PAYLOAD_MIGRATE_SKIP_PROMPT=true
   ```

2. **Alternative: Run migrations locally before deployment:**
   ```bash
   # Connect to production database locally
   DATABASE_URI=your-production-db-uri pnpm payload migrate
   ```

3. **If migrations get stuck during build:**
   - The postgres adapter is configured to skip prompts in production when `NODE_ENV=production`
   - Ensure `PAYLOAD_MIGRATE_SKIP_PROMPT=true` is set in your deployment platform
   - Consider running migrations as a separate deployment step

## Architecture Overview

This is a Next.js 15 application with Payload CMS V3, using PostgreSQL as the database. The project uses the App Router pattern with distinct sections for frontend and admin functionality.

### Key Architectural Decisions

1. **Route Organization**: The app directory is split into `(frontend)` for public routes and `(payload)` for admin/API routes. This separation allows for different layouts and middleware configurations.

2. **Content Blocks System**: Content is built using a flexible block-based architecture. Each block (Banner, Content, Media, etc.) is self-contained with its own component and server-side rendering logic. Blocks are defined in `/src/blocks/` and registered in the Pages collection.

3. **Collection Architecture**: Payload collections extend base configs (e.g., `generatePreviewPath`) to maintain consistency. Each collection has:
   - Schema definition with fields
   - Access control rules
   - Hooks for data processing
   - Admin UI configuration

4. **Theme System**: Dark/light theme support is implemented using CSS variables and React context. The theme provider wraps the entire app and persists user preference.

5. **SEO Strategy**: SEO is handled through the Payload SEO plugin with automatic metadata generation. Each page/post can override default SEO settings.

### Data Flow

1. **Content Creation**: Editors create content in Payload Admin → Data stored in PostgreSQL → TypeScript types auto-generated
2. **Content Rendering**: Next.js fetches data via Payload Local API → Server components render blocks → Client components hydrate for interactivity
3. **Authentication**: JWT-based auth with httpOnly cookies → Access control checked at collection level → Frontend uses auth context

### Key Integration Points

- **Payload Local API**: Used in server components to fetch data without HTTP overhead
- **GraphQL/REST APIs**: Available at `/api/graphql` and `/api/[collection]` for external integrations
- **Live Preview**: Editors can preview changes in real-time through the preview route
- **Search**: Integrated search using Payload Search plugin with beforeSync hooks

### Performance Considerations

- Server components used by default for better performance
- Images optimized through Sharp integration
- Database queries optimized through Payload's query depth limits
- Static generation for pages where possible

### Development Patterns

- Always use `PayloadComponent` for proper client/server component boundaries
- Extend existing blocks rather than creating new ones when possible
- Use the fields directory for reusable field configurations
- Maintain type safety by running `generate:types` after schema changes