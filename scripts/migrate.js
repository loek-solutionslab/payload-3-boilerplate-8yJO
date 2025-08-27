import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URI
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Define all missing columns we need to check
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