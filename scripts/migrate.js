import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Check if description column already exists
    const columnCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'header_nav_items' AND column_name = 'description'
    `)

    if (columnCheck.rows.length === 0) {
      console.log('Adding description column to header_nav_items...')
      await client.query('ALTER TABLE header_nav_items ADD COLUMN description varchar')
      console.log('Migration completed successfully')
    } else {
      console.log('Description column already exists, skipping migration')
    }
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration()