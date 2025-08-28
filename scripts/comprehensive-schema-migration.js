import { Client } from 'pg'
import fs from 'fs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '..', '.env'), quiet: true })

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function comprehensiveSchemaMigration() {
  try {
    await client.connect()
    console.log('🔗 Connected to Railway PostgreSQL database')
    
    // Load the analysis to understand what we're working with
    const analysisPath = join(__dirname, 'database-analysis.json')
    if (!fs.existsSync(analysisPath)) {
      throw new Error('❌ Please run complete-schema-analysis.js first')
    }
    
    const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'))
    console.log('📊 Loaded database analysis')

    // Step 1: Ensure all snake_case tables have all required columns
    console.log('\n🔧 Step 1: Adding missing columns to snake_case tables...')
    
    const columnUpdates = [
      {
        table: 'pages_blocks_relume_team',
        columns: [
          { name: 'tagline', type: 'VARCHAR DEFAULT \'Team\'', check: true },
          { name: 'hiring_section_show', type: 'BOOLEAN DEFAULT false', check: false },
          { name: 'hiring_section_title', type: 'VARCHAR', check: false },
          { name: 'hiring_section_description', type: 'TEXT', check: false },
          { name: 'hiring_section_button_text', type: 'VARCHAR', check: false },
          { name: 'hiring_section_button_link_type', type: 'VARCHAR', check: false },
          { name: 'hiring_section_button_link_url', type: 'VARCHAR', check: false }
        ]
      },
      {
        table: 'pages_blocks_relume_gallery',
        columns: [
          { name: 'title', type: 'VARCHAR DEFAULT \'Gallery\'', check: true },
          { name: 'description', type: 'TEXT', check: false },
          { name: 'background_color', type: 'VARCHAR', check: false },
          { name: 'block_name', type: 'VARCHAR', check: false }
        ]
      },
      {
        table: 'pages_blocks_relume_pricing',
        columns: [
          { name: 'title', type: 'VARCHAR DEFAULT \'Pricing\'', check: true },
          { name: 'description', type: 'TEXT', check: false },
          { name: 'background_color', type: 'VARCHAR', check: false },
          { name: 'block_name', type: 'VARCHAR', check: false }
        ]
      },
      {
        table: 'pages_blocks_relume_contact',
        columns: [
          { name: 'title', type: 'VARCHAR DEFAULT \'Contact\'', check: true },
          { name: 'description', type: 'TEXT', check: false },
          { name: 'background_color', type: 'VARCHAR', check: false },
          { name: 'block_name', type: 'VARCHAR', check: false }
        ]
      }
    ]

    for (const tableUpdate of columnUpdates) {
      console.log(`\n🔧 Updating table: ${tableUpdate.table}`)
      
      // Check if table exists
      const tableCheck = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1
      `, [tableUpdate.table])

      if (tableCheck.rows.length === 0) {
        console.log(`⚠️  Table ${tableUpdate.table} does not exist, skipping...`)
        continue
      }

      for (const col of tableUpdate.columns) {
        try {
          // Check if column exists
          const columnCheck = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = $1 AND column_name = $2
          `, [tableUpdate.table, col.name])

          if (columnCheck.rows.length === 0) {
            console.log(`  ➕ Adding column ${col.name}...`)
            await client.query(`ALTER TABLE "${tableUpdate.table}" ADD COLUMN "${col.name}" ${col.type}`)
            console.log(`  ✅ Added column ${col.name}`)
          } else {
            console.log(`  ℹ️  Column ${col.name} already exists`)
          }
        } catch (error) {
          console.error(`  ❌ Error adding column ${col.name}:`, error.message)
          // Continue with other columns
        }
      }
    }

    // Step 2: Migrate data from camelCase to snake_case tables
    console.log('\n🔄 Step 2: Migrating data from camelCase to snake_case tables...')
    
    const dataMigrations = [
      {
        description: 'Migrate RelumeTeam data',
        oldTable: 'pages__blocks_relumeTeam',
        newTable: 'pages_blocks_relume_team',
        mapping: {
          'id': 'id',
          '_order': '_order', 
          '_parent_id': '_parent_id',
          '_path': '_path',
          'tagline': 'tagline',
          'title': 'title',
          'description': 'description',
          'hiring_section_show': 'hiring_section_show',
          'hiring_section_title': 'hiring_section_title',
          'hiring_section_description': 'hiring_section_description',
          'hiring_section_button_text': 'hiring_section_button_text',
          'hiring_section_button_link_type': 'hiring_section_button_link_type',
          'hiring_section_button_link_url': 'hiring_section_button_link_url',
          'background_color': 'background_color',
          'block_name': 'block_name'
        }
      },
      {
        description: 'Migrate RelumeTeam team members',
        oldTable: 'pages__blocks_relumeTeam_teamMembers',
        newTable: 'pages_blocks_relume_team_team_members',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          'photo_id': 'photo_id',
          'name': 'name',
          'position': 'position',
          'bio': 'bio'
        }
      },
      {
        description: 'Migrate RelumeGallery data',
        oldTable: 'pages__blocks_relumeGallery',
        newTable: 'pages_blocks_relume_gallery',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          '_path': '_path',
          'title': 'title',
          'description': 'description',
          'background_color': 'background_color',
          'block_name': 'block_name'
        }
      },
      {
        description: 'Migrate RelumeGallery images',
        oldTable: 'pages__blocks_relumeGallery_images',
        newTable: 'pages_blocks_relume_gallery_images',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          'image_id': 'image_id',
          'alt_text': 'alt_text'
        }
      },
      {
        description: 'Migrate RelumePricing data',
        oldTable: 'pages__blocks_relumePricing',
        newTable: 'pages_blocks_relume_pricing',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          '_path': '_path',
          'title': 'title',
          'description': 'description',
          'background_color': 'background_color',
          'block_name': 'block_name'
        }
      },
      {
        description: 'Migrate RelumePricing plans',
        oldTable: 'pages__blocks_relumePricing_plans',
        newTable: 'pages_blocks_relume_pricing_plans',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          'name': 'name',
          'price': 'price',
          'description': 'description',
          'features': 'features',
          'button_text': 'button_text',
          'button_link': 'button_link'
        }
      },
      {
        description: 'Migrate RelumeContact data',
        oldTable: 'pages__blocks_relumeContact',
        newTable: 'pages_blocks_relume_contact',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          '_path': '_path',
          'title': 'title',
          'description': 'description',
          'background_color': 'background_color',
          'block_name': 'block_name'
        }
      },
      {
        description: 'Migrate RelumeContact methods',
        oldTable: 'pages__blocks_relumeContact_contactMethods',
        newTable: 'pages_blocks_relume_contact_contact_methods',
        mapping: {
          'id': 'id',
          '_order': '_order',
          '_parent_id': '_parent_id',
          'icon': 'icon',
          'title': 'title',
          'description': 'description',
          'contact_info': 'contact_info',
          'link': 'link'
        }
      }
    ]

    for (const migration of dataMigrations) {
      try {
        console.log(`\n🔄 ${migration.description}...`)

        // Check if both tables exist
        const oldExists = await client.query(`
          SELECT COUNT(*) as count FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [migration.oldTable])

        const newExists = await client.query(`
          SELECT COUNT(*) as count FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        `, [migration.newTable])

        if (oldExists.rows[0].count == 0) {
          console.log(`  ℹ️  Old table ${migration.oldTable} does not exist, skipping migration`)
          continue
        }

        if (newExists.rows[0].count == 0) {
          console.log(`  ℹ️  New table ${migration.newTable} does not exist, skipping migration`)
          continue
        }

        // Check data counts
        const oldCount = await client.query(`SELECT COUNT(*) as count FROM "${migration.oldTable}"`)
        const newCount = await client.query(`SELECT COUNT(*) as count FROM "${migration.newTable}"`)

        console.log(`  📊 Old table: ${oldCount.rows[0].count} records, new table: ${newCount.rows[0].count} records`)

        if (oldCount.rows[0].count > 0) {
          // Get the columns that actually exist in both tables
          const oldColumns = await client.query(`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = $1 ORDER BY ordinal_position
          `, [migration.oldTable])
          
          const newColumns = await client.query(`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = $1 ORDER BY ordinal_position
          `, [migration.newTable])

          const oldColumnNames = oldColumns.rows.map(row => row.column_name)
          const newColumnNames = newColumns.rows.map(row => row.column_name)

          // Only migrate columns that exist in both tables
          const mappedColumns = Object.entries(migration.mapping).filter(([oldCol, newCol]) => 
            oldColumnNames.includes(oldCol) && newColumnNames.includes(newCol)
          )

          if (mappedColumns.length > 0) {
            const oldCols = mappedColumns.map(([oldCol]) => `"${oldCol}"`)
            const newCols = mappedColumns.map(([, newCol]) => `"${newCol}"`)
            
            // Clear existing data in new table to avoid duplicates
            await client.query(`DELETE FROM "${migration.newTable}"`)
            
            const migrationQuery = `
              INSERT INTO "${migration.newTable}" (${newCols.join(', ')})
              SELECT ${oldCols.join(', ')}
              FROM "${migration.oldTable}"
            `

            console.log(`  🔄 Migrating ${mappedColumns.length} columns...`)
            const result = await client.query(migrationQuery)
            console.log(`  ✅ Migrated ${result.rowCount} records`)
          } else {
            console.log(`  ⚠️  No matching columns found for migration`)
          }
        } else {
          console.log(`  ℹ️  No data to migrate`)
        }

      } catch (error) {
        console.error(`  ❌ Error in migration "${migration.description}":`, error.message)
      }
    }

    // Step 3: Drop camelCase tables to prevent confusion
    console.log('\n🗑️  Step 3: Removing conflicting camelCase tables...')
    
    const camelCaseTables = analysis.blockTables.camelCase
    for (const tableName of camelCaseTables) {
      try {
        console.log(`  🗑️  Dropping table: ${tableName}`)
        await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`)
        console.log(`  ✅ Dropped table: ${tableName}`)
      } catch (error) {
        console.error(`  ❌ Error dropping table ${tableName}:`, error.message)
      }
    }

    // Step 4: Verify final state
    console.log('\n✅ Step 4: Verifying final database state...')
    
    // Check that snake_case tables exist and have data
    const relumeTeamCount = await client.query(`SELECT COUNT(*) as count FROM "pages_blocks_relume_team"`)
    console.log(`  📊 pages_blocks_relume_team: ${relumeTeamCount.rows[0].count} records`)
    
    const relumeGalleryCount = await client.query(`SELECT COUNT(*) as count FROM "pages_blocks_relume_gallery"`)
    console.log(`  📊 pages_blocks_relume_gallery: ${relumeGalleryCount.rows[0].count} records`)

    // Check that tagline column exists
    const taglineCheck = await client.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'pages_blocks_relume_team' AND column_name = 'tagline'
    `)
    console.log(`  ✅ Tagline column exists: ${taglineCheck.rows.length > 0 ? 'YES' : 'NO'}`)

    console.log('\n🎉 Comprehensive schema migration completed successfully!')
    console.log('\n📋 Summary:')
    console.log('  ✅ Added missing columns to snake_case tables')
    console.log('  ✅ Migrated data from camelCase to snake_case tables')
    console.log('  ✅ Removed conflicting camelCase tables')
    console.log('  ✅ Database is now consistent with snake_case naming')
    console.log('\nNext step: Regenerate Payload types to match the updated schema')

  } catch (error) {
    console.error('❌ Comprehensive schema migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

comprehensiveSchemaMigration()