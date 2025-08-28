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

async function fixSnakeCaseTable() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Add missing columns to snake_case table to match camelCase table
    const columnsToAdd = [
      { name: 'tagline', type: 'VARCHAR DEFAULT \'Team\'', check: true },
    ]

    console.log('🔧 Adding missing columns to pages_blocks_relume_team...')
    
    for (const col of columnsToAdd) {
      try {
        // Check if column exists
        const columnCheck = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = $1 AND column_name = $2
        `, ['pages_blocks_relume_team', col.name])

        if (columnCheck.rows.length === 0) {
          console.log(`Adding column ${col.name} to pages_blocks_relume_team...`)
          await client.query(`ALTER TABLE "pages_blocks_relume_team" ADD COLUMN "${col.name}" ${col.type}`)
          console.log(`✅ Added column ${col.name}`)
        } else {
          console.log(`ℹ️  Column ${col.name} already exists`)
        }
      } catch (error) {
        console.error(`❌ Error adding column ${col.name}:`, error.message)
        // Continue with other columns
      }
    }

    // Check if we need to migrate data from camelCase to snake_case
    const camelCaseCount = await client.query(`SELECT COUNT(*) as count FROM "pages__blocks_relumeTeam"`)
    const snakeCaseCount = await client.query(`SELECT COUNT(*) as count FROM "pages_blocks_relume_team"`)

    console.log(`\nData counts:`)
    console.log(`  camelCase table: ${camelCaseCount.rows[0].count} records`)
    console.log(`  snake_case table: ${snakeCaseCount.rows[0].count} records`)

    if (camelCaseCount.rows[0].count > 0 && snakeCaseCount.rows[0].count == 0) {
      console.log('\n🔄 Migrating data from camelCase to snake_case table...')
      
      const migrationQuery = `
        INSERT INTO "pages_blocks_relume_team" (
          id, _order, _parent_id, _path, tagline, title, description, background_color, block_name
        )
        SELECT 
          id, _order, _parent_id, _path, tagline, title, description, background_color, block_name
        FROM "pages__blocks_relumeTeam"
      `
      
      const result = await client.query(migrationQuery)
      console.log(`✅ Migrated ${result.rowCount} records`)
    } else {
      console.log(`ℹ️  No migration needed`)
    }

    console.log('\n🎉 Snake case table fix completed!')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixSnakeCaseTable()