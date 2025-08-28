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

async function completeSchemaAnalysis() {
  try {
    await client.connect()
    console.log('🔗 Connected to Railway PostgreSQL database')
    
    // Expected Payload blocks based on Pages config
    const expectedBlocks = [
      'CallToAction',
      'Content', 
      'MediaBlock',
      'Archive',
      'FormBlock',
      'FeaturesBlock',
      'NewsletterCTA',
      'HeroBlock',
      'TestimonialsBlock',
      'FAQBlock',
      'CourseArchive',
      'AgeGroupsArchive',
      'PostsArchive',
      'RelumeHeader',
      'RelumeLayout', 
      'RelumeCTA',
      'RelumeGallery',
      'RelumePricing',
      'RelumeTeam',
      'RelumeContact'
    ]

    const analysis = {
      timestamp: new Date().toISOString(),
      database: 'Railway PostgreSQL',
      totalTables: 0,
      blockTables: {
        existing: [],
        missing: [],
        camelCase: [],
        snake_case: [],
        version_tables: []
      },
      columnAnalysis: {},
      foreignKeys: [],
      indexes: [],
      inconsistencies: []
    }

    // 1. Get all tables in the database
    console.log('📊 Analyzing all database tables...')
    const allTables = await client.query(`
      SELECT schemaname, tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `)

    analysis.totalTables = allTables.rows.length
    const tableNames = allTables.rows.map(row => row.tablename)
    
    console.log(`Found ${analysis.totalTables} total tables`)
    
    // 2. Categorize tables by type and naming convention
    console.log('🏷️  Categorizing tables...')
    
    for (const tableName of tableNames) {
      if (tableName.includes('pages_blocks_') || tableName.includes('pages__blocks_')) {
        if (tableName.startsWith('_pages_v_')) {
          analysis.blockTables.version_tables.push(tableName)
        } else if (tableName.includes('__blocks_')) {
          analysis.blockTables.camelCase.push(tableName)
        } else if (tableName.includes('_blocks_')) {
          analysis.blockTables.snake_case.push(tableName)
        }
        analysis.blockTables.existing.push(tableName)
      }
    }

    // 3. Check for missing block tables
    console.log('🔍 Checking for missing block tables...')
    
    for (const block of expectedBlocks) {
      const camelCaseName = `pages__blocks_${block.toLowerCase()}`
      const snakeCaseName = `pages_blocks_${block.toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase()}`
      
      const hasCamelCase = tableNames.some(table => table.includes(camelCaseName))
      const hasSnakeCase = tableNames.some(table => table.includes(snakeCaseName))
      
      if (!hasCamelCase && !hasSnakeCase) {
        analysis.blockTables.missing.push({
          block,
          expectedCamelCase: camelCaseName,
          expectedSnakeCase: snakeCaseName
        })
      }
    }

    // 4. Analyze columns for each block table
    console.log('📋 Analyzing table columns...')
    
    for (const tableName of analysis.blockTables.existing) {
      const columns = await client.query(`
        SELECT 
          column_name, 
          data_type, 
          is_nullable, 
          column_default,
          character_maximum_length
        FROM information_schema.columns 
        WHERE table_name = $1
        ORDER BY ordinal_position;
      `, [tableName])
      
      analysis.columnAnalysis[tableName] = columns.rows
    }

    // 5. Get foreign key relationships
    console.log('🔗 Analyzing foreign key relationships...')
    
    const foreignKeys = await client.query(`
      SELECT
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name,
        tc.constraint_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY' 
      AND tc.table_schema = 'public'
      AND tc.table_name LIKE '%pages%blocks%'
      ORDER BY tc.table_name;
    `)
    
    analysis.foreignKeys = foreignKeys.rows

    // 6. Get indexes
    console.log('📇 Analyzing indexes...')
    
    const indexes = await client.query(`
      SELECT
        schemaname,
        tablename,
        indexname,
        indexdef
      FROM pg_indexes
      WHERE schemaname = 'public'
      AND tablename LIKE '%pages%blocks%'
      ORDER BY tablename, indexname;
    `)
    
    analysis.indexes = indexes.rows

    // 7. Detect inconsistencies
    console.log('⚠️  Detecting schema inconsistencies...')
    
    // Check for mixed naming conventions
    if (analysis.blockTables.camelCase.length > 0 && analysis.blockTables.snake_case.length > 0) {
      analysis.inconsistencies.push({
        type: 'MIXED_NAMING_CONVENTIONS',
        description: 'Database contains both camelCase and snake_case table names',
        camelCaseCount: analysis.blockTables.camelCase.length,
        snakeCaseCount: analysis.blockTables.snake_case.length
      })
    }

    // Check for version tables without main tables
    for (const versionTable of analysis.blockTables.version_tables) {
      const mainTableName = versionTable.replace('_pages_v_blocks_', 'pages_blocks_')
      if (!tableNames.includes(mainTableName)) {
        analysis.inconsistencies.push({
          type: 'ORPHANED_VERSION_TABLE',
          description: `Version table exists but main table missing: ${versionTable} -> ${mainTableName}`,
          versionTable,
          expectedMainTable: mainTableName
        })
      }
    }

    // Check for tables with missing standard columns
    const standardColumns = ['id', '_order', '_parent_id', '_path']
    for (const tableName of analysis.blockTables.existing) {
      const columns = analysis.columnAnalysis[tableName]
      const columnNames = columns.map(col => col.column_name)
      
      for (const stdCol of standardColumns) {
        if (!columnNames.includes(stdCol)) {
          analysis.inconsistencies.push({
            type: 'MISSING_STANDARD_COLUMN',
            description: `Table ${tableName} missing standard column: ${stdCol}`,
            table: tableName,
            missingColumn: stdCol
          })
        }
      }
    }

    // 8. Save analysis to file
    const analysisPath = join(__dirname, 'database-analysis.json')
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2))
    
    // 9. Generate human-readable report
    console.log('\n' + '='.repeat(60))
    console.log('📋 DATABASE SCHEMA ANALYSIS REPORT')
    console.log('='.repeat(60))
    
    console.log(`\n📊 OVERVIEW:`)
    console.log(`  • Total tables: ${analysis.totalTables}`)
    console.log(`  • Block tables: ${analysis.blockTables.existing.length}`)
    console.log(`  • Missing blocks: ${analysis.blockTables.missing.length}`)
    console.log(`  • Inconsistencies: ${analysis.inconsistencies.length}`)
    
    console.log(`\n🏷️  TABLE NAMING:`)
    console.log(`  • CamelCase tables: ${analysis.blockTables.camelCase.length}`)
    console.log(`  • Snake_case tables: ${analysis.blockTables.snake_case.length}`)
    console.log(`  • Version tables: ${analysis.blockTables.version_tables.length}`)
    
    console.log(`\n❌ MISSING BLOCK TABLES:`)
    for (const missing of analysis.blockTables.missing) {
      console.log(`  • ${missing.block} (expected: ${missing.expectedSnakeCase})`)
    }
    
    console.log(`\n⚠️  MAJOR INCONSISTENCIES:`)
    for (const issue of analysis.inconsistencies) {
      console.log(`  • ${issue.type}: ${issue.description}`)
    }

    console.log(`\n📋 CamelCase Tables Found:`)
    for (const table of analysis.blockTables.camelCase) {
      console.log(`  • ${table}`)
    }

    console.log(`\n📋 Snake_case Tables Found:`)
    for (const table of analysis.blockTables.snake_case) {
      console.log(`  • ${table}`)
    }

    console.log(`\n💾 Full analysis saved to: ${analysisPath}`)
    console.log('\n🎉 Schema analysis completed!')
    
    return analysis

  } catch (error) {
    console.error('❌ Schema analysis failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

completeSchemaAnalysis()