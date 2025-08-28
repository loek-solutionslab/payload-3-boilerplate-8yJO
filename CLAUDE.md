# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎉 PROJECT STATUS: SUCCESSFULLY DEPLOYED ON RAILWAY! 

**Latest Update**: August 28, 2025
- ✅ **Railway Deployment**: LIVE and running successfully
- ✅ **Database Schema**: Fixed and consolidated to snake_case naming
- ✅ **Volume Permissions**: Resolved Railway lost+found directory issues  
- ✅ **Container Startup**: Stable with proper root-to-user privilege switching
- ✅ **Migration System**: Environment-aware (skips in production)

**Critical Issues Resolved**:
- Fixed mixed camelCase/snake_case table naming conflicts
- Resolved Railway volume mount permission errors
- Implemented production-ready container startup sequence
- Consolidated database schema to consistent snake_case format

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

## Payload CMS Core Concepts

### Collections
Collections are the primary way to structure recurring data. Each collection:
- Represents a group of documents with a common schema
- Auto-generates Local API, REST API, and GraphQL API endpoints
- Can include authentication features when enabled
- Supports custom access control, hooks, and admin UI configuration

Common collection patterns:
- Users (with authentication enabled)
- Pages, Posts, Products
- Media/Uploads
- Categories, Tags

### Fields
Fields define the schema and UI for documents. Key field concepts:
- **Field Types**: Text, Number, Select, Relationship, Array, Blocks, RichText, Upload, etc.
- **Validation**: Built-in and custom validation rules
- **Conditional Logic**: Show/hide fields based on other field values
- **Access Control**: Field-level permissions
- **Localization**: Field-level translation support
- **Hooks**: Field-specific lifecycle hooks

### Hooks
Hooks execute custom logic during document lifecycle:

**Collection Hooks**:
- `beforeOperation`: Modify arguments before operations
- `beforeChange`: Run before create/update (data is unvalidated)
- `afterChange`: Run after create/update (data is validated and saved)
- `afterRead`: Modify data before returning to client
- `beforeDelete`/`afterDelete`: Handle deletion logic

**Field Hooks**:
- `beforeValidate`: Transform data before validation
- `afterRead`: Format data for output
- `beforeChange`/`afterChange`: Field-specific change handlers

### Authentication
When enabled on a collection:
- Adds login, logout, refresh, and password reset operations
- Supports email verification and API keys
- Integrates with JWT for token-based auth
- Provides user account management UI in admin panel

### Access Control
Define permissions at multiple levels:
```typescript
// Collection-level access
access: {
  create: ({ req: { user } }) => user?.role === 'admin',
  read: true, // Public access
  update: ({ req: { user }, id }) => user?.id === id,
  delete: () => false, // No one can delete
}

// Field-level access
fields: [{
  name: 'secretField',
  type: 'text',
  access: {
    read: ({ req: { user } }) => user?.role === 'admin',
  }
}]
```

### Globals
Globals are single-instance documents for non-repeating data:
- Site settings
- Navigation menus
- Footer content
- SEO defaults

### Relationships
Payload provides powerful relationship fields:
- One-to-one, one-to-many, many-to-many
- Polymorphic relationships (relate to multiple collections)
- Virtual relationships via hooks
- Automatic reverse lookups

## Common Development Patterns

### Custom Components
```typescript
// Custom field component
import { Field } from '@payloadcms/ui'
export const CustomField: Field = {
  name: 'customField',
  type: 'text',
  admin: {
    components: {
      Field: '/path/to/CustomFieldComponent',
    }
  }
}
```

### Extending Collections
```typescript
// Base collection config
const baseCollection = {
  slug: 'base',
  access: defaultAccess,
  hooks: defaultHooks,
}

// Extended collection
const extendedCollection = {
  ...baseCollection,
  slug: 'extended',
  fields: [
    ...baseFields,
    // Additional fields
  ]
}
```

### Block-Based Content
```typescript
// Define reusable blocks
const contentBlocks = {
  slug: 'content',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        BannerBlock,
        ContentBlock,
        MediaBlock,
        // Add more blocks as needed
      ]
    }
  ]
}
```

### API Usage
```typescript
// Local API (server-side)
import { getPayloadHMR } from '@payloadcms/next/utilities'
const payload = await getPayloadHMR({ config })
const pages = await payload.find({ collection: 'pages' })

// REST API
fetch('/api/pages?where[slug][equals]=home')

// GraphQL
const query = `
  query {
    Pages(where: { slug: { equals: "home" } }) {
      docs {
        id
        title
      }
    }
  }
`
```

## Best Practices

### Performance
- Use `depth` parameter to limit nested data fetching
- Implement pagination for large collections
- Cache frequently accessed data
- Use indexes on frequently queried fields
- Optimize images with Sharp integration

### Security
- Always validate and sanitize user input
- Use field-level access control for sensitive data
- Implement rate limiting on public APIs
- Store secrets in environment variables
- Enable CSRF protection in production

### Code Organization
- Group related collections in subdirectories
- Create reusable field configs in `/fields`
- Keep hooks in separate files for complex logic
- Use TypeScript for type safety
- Generate types after schema changes

### Testing
- Test hooks with mock data
- Validate access control rules
- Test API endpoints
- Check field validations
- Verify email templates

### Migration Strategy
- Create migrations for schema changes
- Test migrations locally first
- Back up database before production migrations
- Document breaking changes
- Use feature flags for gradual rollouts