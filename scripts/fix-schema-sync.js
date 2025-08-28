import { Client } from 'pg'
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

async function fixSchemaSync() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Add missing columns to existing camelCase tables to match what Payload expects
    const columnUpdates = [
      {
        table: 'pages__blocks_relumeTeam',
        columns: [
          { name: 'tagline', type: 'VARCHAR DEFAULT \'Team\'', check: true },
          { name: 'hiring_section_show', type: 'BOOLEAN DEFAULT false', check: false },
          { name: 'hiring_section_title', type: 'VARCHAR', check: false },
          { name: 'hiring_section_description', type: 'TEXT', check: false },
          { name: 'hiring_section_button_text', type: 'VARCHAR', check: false },
          { name: 'hiring_section_button_link_type', type: 'VARCHAR', check: false },
          { name: 'hiring_section_button_link_url', type: 'VARCHAR', check: false }
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
            console.log(`Adding column ${col.name} to ${tableUpdate.table}...`)
            await client.query(`ALTER TABLE "${tableUpdate.table}" ADD COLUMN "${col.name}" ${col.type}`)
            console.log(`✅ Added column ${col.name}`)
          } else {
            console.log(`ℹ️  Column ${col.name} already exists`)
          }
        } catch (error) {
          console.error(`❌ Error adding column ${col.name}:`, error.message)
          // Continue with other columns
        }
      }
    }

    // Now migrate data from old camelCase tables to new snake_case tables if needed
    const dataMigrations = [
      {
        description: 'Migrate relumeTeam data from camelCase to snake_case',
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
          'background_color': 'background_color',
          'block_name': 'block_name'
        }
      },
      {
        description: 'Migrate team members data',
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
          console.log(`ℹ️  Old table ${migration.oldTable} does not exist, skipping migration`)
          continue
        }

        if (newExists.rows[0].count == 0) {
          console.log(`ℹ️  New table ${migration.newTable} does not exist, skipping migration`)
          continue
        }

        // Check data counts
        const oldCount = await client.query(`SELECT COUNT(*) as count FROM "${migration.oldTable}"`)
        const newCount = await client.query(`SELECT COUNT(*) as count FROM "${migration.newTable}"`)

        console.log(`Old table has ${oldCount.rows[0].count} records, new table has ${newCount.rows[0].count} records`)

        if (oldCount.rows[0].count > 0 && newCount.rows[0].count == 0) {
          // Build migration query
          const oldColumns = Object.keys(migration.mapping)
          const newColumns = Object.values(migration.mapping)
          
          const migrationQuery = `
            INSERT INTO "${migration.newTable}" (${newColumns.map(col => `"${col}"`).join(', ')})
            SELECT ${oldColumns.map(col => `"${col}"`).join(', ')}
            FROM "${migration.oldTable}"
          `

          console.log(`Migrating data...`)
          const result = await client.query(migrationQuery)
          console.log(`✅ Migrated ${result.rowCount} records`)
        } else {
          console.log(`ℹ️  Migration not needed (old: ${oldCount.rows[0].count}, new: ${newCount.rows[0].count})`)
        }

      } catch (error) {
        console.error(`❌ Error in migration "${migration.description}":`, error.message)
      }
    }

    console.log('\n🎉 Schema synchronization completed!')

  } catch (error) {
    console.error('❌ Schema sync failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixSchemaSync()