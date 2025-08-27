import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Define all missing tables and columns we need to check
    // Using Payload's internal naming convention: pages__blocks_[blockSlug]_[fieldName]
    const tablesToCreate = [
      {
        name: 'pages__blocks_relumeGallery',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeGallery" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "variant" VARCHAR DEFAULT 'gallery-04',
          "title" VARCHAR NOT NULL DEFAULT 'Afbeeldingen Galerij',
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages__blocks_relumeGallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeGallery_images',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeGallery_images" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "image_id" INTEGER,
          "link_type" VARCHAR DEFAULT 'none',
          "link_reference_id" INTEGER,
          "link_url" VARCHAR,
          CONSTRAINT "pages__blocks_relumeGallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumeGallery"("id") ON DELETE CASCADE,
          CONSTRAINT "pages__blocks_relumeGallery_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL,
          CONSTRAINT "pages__blocks_relumeGallery_images_link_reference_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages__blocks_relumePricing',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumePricing" (
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
          CONSTRAINT "pages__blocks_relumePricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumePricing_plans',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumePricing_plans" (
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
          CONSTRAINT "pages__blocks_relumePricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumePricing"("id") ON DELETE CASCADE,
          CONSTRAINT "pages__blocks_relumePricing_plans_button_link_reference_id_fk" FOREIGN KEY ("button_link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages__blocks_relumePricing_plans_features',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumePricing_plans_features" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "text" VARCHAR NOT NULL,
          CONSTRAINT "pages__blocks_relumePricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumePricing_plans"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeTeam',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeTeam" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "tagline" VARCHAR DEFAULT 'Team',
          "title" VARCHAR NOT NULL DEFAULT 'Ons Team',
          "description" TEXT DEFAULT 'Professionele mediacoaches voor de onderbouw',
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages__blocks_relumeTeam_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeTeam_teamMembers',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeTeam_teamMembers" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "photo_id" INTEGER,
          "name" VARCHAR NOT NULL,
          "position" VARCHAR NOT NULL,
          "bio" TEXT NOT NULL,
          CONSTRAINT "pages__blocks_relumeTeam_teamMembers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumeTeam"("id") ON DELETE CASCADE,
          CONSTRAINT "pages__blocks_relumeTeam_teamMembers_photo_id_fk" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL
        )`
      },
      {
        name: 'pages__blocks_relumeTeam_socialLinks',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeTeam_socialLinks" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "team_member" VARCHAR NOT NULL,
          "platform" VARCHAR NOT NULL,
          "url" VARCHAR NOT NULL,
          CONSTRAINT "pages__blocks_relumeTeam_socialLinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumeTeam"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeContact',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeContact" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages__blocks_relumeContact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeContact_contactMethods',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeContact_contactMethods" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "icon" VARCHAR,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "contact_info" VARCHAR,
          "link" VARCHAR,
          CONSTRAINT "pages__blocks_relumeContact_contactMethods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages__blocks_relumeContact"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeHeader',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeHeader" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages__blocks_relumeHeader_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeLayout',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeLayout" (
          "id" SERIAL PRIMARY KEY,
          "_order" INTEGER NOT NULL,
          "_parent_id" INTEGER NOT NULL,
          "_path" VARCHAR NOT NULL,
          "title" VARCHAR NOT NULL,
          "description" TEXT,
          "background_color" VARCHAR,
          "block_name" VARCHAR,
          CONSTRAINT "pages__blocks_relumeLayout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE
        )`
      },
      {
        name: 'pages__blocks_relumeCTA',
        sql: `CREATE TABLE IF NOT EXISTS "pages__blocks_relumeCTA" (
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
          CONSTRAINT "pages__blocks_relumeCTA_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE,
          CONSTRAINT "pages__blocks_relumeCTA_button_link_reference_id_fk" FOREIGN KEY ("button_link_reference_id") REFERENCES "pages"("id") ON DELETE SET NULL
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

    // Data migration: Move social links from nested structure to top-level
    const dataRestructuring = [
      {
        description: 'Move social links from teamMembers to top-level socialLinks',
        oldTable: 'pages__blocks_relumeTeam_teamMembers_socialLinks',
        newTable: 'pages__blocks_relumeTeam_socialLinks',
        teamMembersTable: 'pages__blocks_relumeTeam_teamMembers'
      }
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

    // Handle data restructuring to fix PostgreSQL identifier length limits
    for (const migration of dataRestructuring) {
      try {
        console.log(`🔄 ${migration.description}...`)
        
        // Check if old nested table exists
        const oldTableCheck = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [migration.oldTable])

        // Check if new flat table exists
        const newTableCheck = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [migration.newTable])

        if (oldTableCheck.rows.length > 0 && newTableCheck.rows.length > 0) {
          // Check if data migration is needed
          const oldDataCount = await client.query(`SELECT COUNT(*) FROM "${migration.oldTable}"`)
          const newDataCount = await client.query(`SELECT COUNT(*) FROM "${migration.newTable}"`)
          
          if (oldDataCount.rows[0].count > 0 && newDataCount.rows[0].count === '0') {
            console.log(`Migrating ${oldDataCount.rows[0].count} social links to new structure...`)
            
            // Migrate data from nested to flat structure
            const migrateResult = await client.query(`
              INSERT INTO "${migration.newTable}" ("_order", "_parent_id", "team_member", "platform", "url")
              SELECT 
                sl."_order",
                tm."_parent_id", -- Reference the relumeTeam block, not the teamMember
                tm."name" as "team_member",
                COALESCE(sl."plat", sl."platform") as "platform", -- Handle both old and new column names
                sl."url"
              FROM "${migration.oldTable}" sl
              JOIN "${migration.teamMembersTable}" tm ON sl."_parent_id" = tm."id"
            `)
            
            console.log(`✅ Migrated ${migrateResult.rowCount} social links successfully`)
          } else {
            console.log(`ℹ️  Data migration not needed (old: ${oldDataCount.rows[0].count}, new: ${newDataCount.rows[0].count})`)
          }
        } else {
          console.log(`ℹ️  Migration tables not found, skipping data migration`)
        }
      } catch (error) {
        console.error(`❌ Error during data migration:`, error.message)
        // Continue with other migrations instead of failing completely
      }
    }

    // Verificatie van kritieke tabellen
    const criticalTables = [
      'pages__blocks_relumeTeam_teamMembers',
      'pages__blocks_relumeTeam_socialLinks',
      'pages__blocks_relumeContact_contactMethods',
      'pages__blocks_relumePricing',
      'pages__blocks_relumePricing_plans'
    ]

    console.log('🔍 Verifying critical tables...')
    for (const tableName of criticalTables) {
      try {
        const result = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = $1
          );
        `, [tableName])
        
        if (!result.rows[0].exists) {
          console.error(`❌ CRITICAL: Table ${tableName} missing after migration`)
          throw new Error(`Critical table ${tableName} missing after migration`)
        }
        console.log(`✅ Verified: ${tableName} exists`)
      } catch (error) {
        console.error(`❌ Error verifying table ${tableName}:`, error.message)
        throw error
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