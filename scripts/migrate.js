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
      const tableCheck = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1
      `, [tableSpec.name])

      if (tableCheck.rows.length === 0) {
        console.log(`Creating table ${tableSpec.name}...`)
        await client.query(tableSpec.sql)
        console.log(`Table ${tableSpec.name} created successfully`)
      } else {
        console.log(`Table ${tableSpec.name} already exists`)
      }
    }

    // Then, add missing columns
    for (const migration of migrations) {
      const { table, column, type } = migration
      
      const columnCheck = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1 AND column_name = $2
      `, [table, column])

      if (columnCheck.rows.length === 0) {
        console.log(`Adding ${column} column to ${table}...`)
        await client.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`)
        console.log(`${column} column added successfully`)
      } else {
        console.log(`${column} column already exists in ${table}`)
      }
    }

    console.log('All migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration()