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

async function checkColumns() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Check columns in the failing table
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'pages__blocks_relumeTeam'
      ORDER BY ordinal_position;
    `)

    console.log('\n=== Columns in pages__blocks_relumeTeam ===')
    if (result.rows.length === 0) {
      console.log('❌ Table pages__blocks_relumeTeam does not exist!')
    } else {
      result.rows.forEach(row => {
        console.log(`${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'} ${row.column_default ? `DEFAULT ${row.column_default}` : ''}`)
      })
    }

    // Also check the snake_case version
    const snakeResult = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'pages_blocks_relume_team'
      ORDER BY ordinal_position;
    `)

    console.log('\n=== Columns in pages_blocks_relume_team ===')
    if (snakeResult.rows.length === 0) {
      console.log('❌ Table pages_blocks_relume_team does not exist!')
    } else {
      snakeResult.rows.forEach(row => {
        console.log(`${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'} ${row.column_default ? `DEFAULT ${row.column_default}` : ''}`)
      })
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.end()
  }
}

checkColumns()