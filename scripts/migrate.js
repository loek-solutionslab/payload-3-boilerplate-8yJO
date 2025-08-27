import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Check if description column exists
    const descriptionCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'header_nav_items' AND column_name = 'description'
    `)

    if (descriptionCheck.rows.length === 0) {
      console.log('Adding description column to header_nav_items...')
      await client.query('ALTER TABLE header_nav_items ADD COLUMN description varchar')
      console.log('Description column added successfully')
    } else {
      console.log('Description column already exists')
    }

    // Check if featured column exists
    const featuredCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'header_nav_items' AND column_name = 'featured'
    `)

    if (featuredCheck.rows.length === 0) {
      console.log('Adding featured column to header_nav_items...')
      await client.query('ALTER TABLE header_nav_items ADD COLUMN featured boolean')
      console.log('Featured column added successfully')
    } else {
      console.log('Featured column already exists')
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