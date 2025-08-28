import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // First ensure the payload_migrations table exists
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS payload_migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      batch INTEGER NOT NULL,
      migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Mark all previous migrations as already run (since the database already has these changes)
  const previousMigrations = [
    '20241125_222020_initial',
    '20241214_124128',
    '20250827_075203_new_collections',
    '20250827_105215_course_archive_block',
    '20250827_115355_add_background_colors',
    '20250827_220932_add_header_nav_description'
  ]

  for (const migration of previousMigrations) {
    await db.execute(sql`
      INSERT INTO payload_migrations (name, batch)
      VALUES (${migration}, 1)
      ON CONFLICT (name) DO NOTHING
    `)
  }

  console.log('Marked existing migrations as complete')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove the migration entries
  await db.execute(sql`
    DELETE FROM payload_migrations 
    WHERE name IN (
      '20241125_222020_initial',
      '20241214_124128',
      '20250827_075203_new_collections',
      '20250827_105215_course_archive_block',
      '20250827_115355_add_background_colors',
      '20250827_220932_add_header_nav_description'
    )
  `)
}