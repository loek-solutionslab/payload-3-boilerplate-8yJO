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

async function checkTables() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Check existing tables with relume in the name
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%relume%'
      ORDER BY table_name;
    `)

    console.log('\n=== Existing Relume Tables ===')
    result.rows.forEach(row => {
      console.log(row.table_name)
    })

    // Check for pages blocks tables
    const blocksResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'pages%blocks%'
      ORDER BY table_name;
    `)

    console.log('\n=== Pages Blocks Tables ===')
    blocksResult.rows.forEach(row => {
      console.log(row.table_name)
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.end()
  }
}

checkTables()