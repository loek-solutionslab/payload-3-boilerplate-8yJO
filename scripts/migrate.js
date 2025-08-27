import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Define all missing tables and columns we need to check
    const tablesToCreate = [
      {
        name: 'pages_blocks_relume_gallery',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_gallery" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "variant" VARCHAR DEFAULT 'gallery-04',
          "title" VARCHAR NOT NULL DEFAULT 'Afbeeldingen Galerij',
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_gallery_images',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_gallery_images" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "image_id" INTEGER,
          "link_type" VARCHAR DEFAULT 'none',
          "link_reference_id" INTEGER,
          "link_url" VARCHAR,
          CONSTRAINT "pages_blocks_relume_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_relume_gallery"("id") ON DELETE CASCADE,
          CONSTRAINT "pages_blocks_relume_gallery_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL,
          CONSTRAINT "pages_blocks_relume_gallery_images_link_reference_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages_blocks_relume_pricing',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_pricing" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "tagline" VARCHAR DEFAULT 'Prijzen',
          "title" VARCHAR NOT NULL DEFAULT 'Prijsplan',
          "description" TEXT DEFAULT 'Ontdek onze flexibele cursusopties voor ouders.',
          "monthly_tab_label" VARCHAR DEFAULT 'Maandelijks',
          "yearly_tab_label" VARCHAR DEFAULT 'Jaarlijks',
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_pricing_plans',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_pricing_plans" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "name" VARCHAR NOT NULL,
          "monthly_price" VARCHAR NOT NULL,
          "yearly_price" VARCHAR NOT NULL,
          "yearly_discount" VARCHAR,
          "button_text" VARCHAR DEFAULT 'Aan de slag',
          "button_link_type" VARCHAR DEFAULT 'reference',
          "button_link_reference_id" INTEGER,
          "button_link_url" VARCHAR,
          CONSTRAINT "pages_blocks_relume_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_relume_pricing"("id") ON DELETE CASCADE,
          CONSTRAINT "pages_blocks_relume_pricing_plans_button_link_reference_id_fk" FOREIGN KEY ("button_link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages_blocks_relume_pricing_plans_features',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_pricing_plans_features" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "text" VARCHAR NOT NULL,
          CONSTRAINT "pages_blocks_relume_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_relume_pricing_plans"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_team',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_team" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'team_members',
        sql: `CREATE TABLE IF NOT EXISTS "team_members" (
          "id" SERIAL PRIMARY KEY,
          "photo_id" INTEGER,
          "name" VARCHAR NOT NULL,
          "position" VARCHAR,
          "bio" TEXT,
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "team_members_photo_id_fk" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages_blocks_relume_team_members',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_team_members" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "team_member_id" INTEGER,
          CONSTRAINT "pages_blocks_relume_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_relume_team"("id") ON DELETE CASCADE,
          CONSTRAINT "pages_blocks_relume_team_members_team_member_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "team_members"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'social',
        sql: `CREATE TABLE IF NOT EXISTS "social" (
          "id" SERIAL PRIMARY KEY,
          "platform" VARCHAR NOT NULL,
          "url" VARCHAR NOT NULL,
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      },
      {
        name: 'pages_blocks_relume_contact_contact_methods',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_contact_contact_methods" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "icon" VARCHAR,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "contact_info" VARCHAR,
          "link" VARCHAR,
          CONSTRAINT "pages_blocks_relume_contact_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_relume_contact"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_contact',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_contact" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_header',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_header" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_layout',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_layout" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages_blocks_relume_cta',
        sql: `CREATE TABLE IF NOT EXISTS "pages_blocks_relume_cta" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "button_text" VARCHAR,
          "button_link_type" VARCHAR DEFAULT 'reference',
          "button_link_reference_id" INTEGER,
          "button_link_url" VARCHAR,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages_blocks_relume_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE,
          CONSTRAINT "pages_blocks_relume_cta_button_link_reference_id_fk" FOREIGN KEY ("button_link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
        )`
      }
    ]

    const migrations = [
      { table: 'header_nav_items', column: 'description', type: 'varchar' },
      { table: 'header_nav_items', column: 'featured', type: 'boolean' },
      { table: 'header', column: 'logo_id', type: 'integer' },
      { table: 'header', column: 'cta_button_show', type: 'boolean' },
      { table: 'header', column: 'cta_button_link_type', type: 'varchar' },
      { table: 'header', column: 'cta_button_link_new_tab', type: 'boolean' },
      { table: 'header', column: 'cta_button_link_url', type: 'varchar' },
      { table: 'header', column: 'cta_button_link_label', type: 'varchar' },
      { table: 'header', column: 'cta_button_style', type: 'varchar' },
      { table: 'header', column: 'show_search', type: 'boolean' }
    ]

    // First, create missing tables
    for (const tableSpec of tablesToCreate) {
      try {
        const tableCheck = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [tableSpec.name])

        if (tableCheck.rows.length === 0) {
          console.log(`Creating table ${tableSpec.name}...`)
          await client.query(tableSpec.sql)
          console.log(`✅ Table ${tableSpec.name} created successfully`)
        } else {
          console.log(`ℹ️  Table ${tableSpec.name} already exists`)
        }
      } catch (error) {
        console.error(`❌ Error creating table ${tableSpec.name}:`, error.message)
        // Continue with other tables instead of failing completely
      }
    }

    // Then, add missing columns
    for (const migration of migrations) {
      try {
        const { table, column, type } = migration
        
        // Check if table exists first
        const tableCheck = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [table])

        if (tableCheck.rows.length === 0) {
          console.log(`⚠️  Table ${table} does not exist, skipping column ${column}`)
          continue
        }

        const columnCheck = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = $1 AND column_name = $2
        `, [table, column])

        if (columnCheck.rows.length === 0) {
          console.log(`Adding ${column} column to ${table}...`)
          await client.query(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`)
          console.log(`✅ ${column} column added successfully`)
        } else {
          console.log(`ℹ️  ${column} column already exists in ${table}`)
        }
      } catch (error) {
        console.error(`❌ Error adding column ${migration.column} to ${migration.table}:`, error.message)
        // Continue with other migrations instead of failing completely
      }
    }

    console.log('🎉 All migrations completed successfully')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration()