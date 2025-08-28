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

async function fixSocialLinks() {
  try {
    await client.connect()
    console.log('Connected to database')

    // Check if the expected table exists and has data
    const tableCheck = await client.query(`
      SELECT COUNT(*) as count FROM pages_blocks_relume_team_social_links;
    `)
    
    console.log(`pages_blocks_relume_team_social_links has ${tableCheck.rows[0].count} records`)

    // Check the old table
    try {
      const oldTableCheck = await client.query(`
        SELECT COUNT(*) as count FROM pages__blocks_relumeTeam_socialLinks;
      `)
      console.log(`pages__blocks_relumeTeam_socialLinks has ${oldTableCheck.rows[0].count} records`)
      
      // If new table is empty but old has data, migrate it
      if (tableCheck.rows[0].count === '0' && oldTableCheck.rows[0].count > 0) {
        console.log('Migrating data from old table to new table...')
        
        const migrateResult = await client.query(`
          INSERT INTO pages_blocks_relume_team_social_links (_order, _parent_id, team_member, platform, url)
          SELECT _order, _parent_id, team_member, platform, url
          FROM pages__blocks_relumeTeam_socialLinks;
        `)
        
        console.log(`✅ Migrated ${migrateResult.rowCount} social links`)
      }
    } catch (oldTableError) {
      console.log('Old table does not exist or has no data')
    }

    // Also check for nested social links and migrate them
    try {
      const nestedCheck = await client.query(`
        SELECT COUNT(*) as count FROM pages_blocks_relume_team_team_members_social_links;
      `)
      console.log(`pages_blocks_relume_team_team_members_social_links has ${nestedCheck.rows[0].count} records`)
      
      if (nestedCheck.rows[0].count > 0) {
        console.log('Migrating nested social links...')
        
        const migrateNested = await client.query(`
          INSERT INTO pages_blocks_relume_team_social_links (_order, _parent_id, team_member, platform, url)
          SELECT 
            sl._order,
            tm._parent_id,
            tm.name as team_member,
            sl.platform,
            sl.url
          FROM pages_blocks_relume_team_team_members_social_links sl
          JOIN pages_blocks_relume_team_team_members tm ON sl._parent_id = tm.id
          ON CONFLICT DO NOTHING;
        `)
        
        console.log(`✅ Migrated ${migrateNested.rowCount} nested social links`)
      }
    } catch (nestedError) {
      console.log('Nested table does not exist or has issues:', nestedError.message)
    }

    // Verify final count
    const finalCheck = await client.query(`
      SELECT COUNT(*) as count FROM pages_blocks_relume_team_social_links;
    `)
    
    console.log(`Final count in pages_blocks_relume_team_social_links: ${finalCheck.rows[0].count}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.end()
  }
}

fixSocialLinks()