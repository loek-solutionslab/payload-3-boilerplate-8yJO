import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Drop hero-related columns from pages table
  await db.execute(sql`
    ALTER TABLE pages 
    DROP COLUMN IF EXISTS hero_type,
    DROP COLUMN IF EXISTS hero_image_id,
    DROP COLUMN IF EXISTS hero_image_position,
    DROP COLUMN IF EXISTS hero_title,
    DROP COLUMN IF EXISTS hero_description,
    DROP COLUMN IF EXISTS hero_primary_button_type,
    DROP COLUMN IF EXISTS hero_primary_button_url,
    DROP COLUMN IF EXISTS hero_primary_button_label,
    DROP COLUMN IF EXISTS hero_primary_button_appearance,
    DROP COLUMN IF EXISTS hero_secondary_button_type,
    DROP COLUMN IF EXISTS hero_secondary_button_url,
    DROP COLUMN IF EXISTS hero_secondary_button_label,
    DROP COLUMN IF EXISTS hero_secondary_button_appearance,
    DROP COLUMN IF EXISTS hero_background_color
  `)

  // Drop hero-related columns from _pages_v table
  await db.execute(sql`
    ALTER TABLE _pages_v 
    DROP COLUMN IF EXISTS version_hero_type,
    DROP COLUMN IF EXISTS version_hero_image_id,
    DROP COLUMN IF EXISTS version_hero_image_position,
    DROP COLUMN IF EXISTS version_hero_title,
    DROP COLUMN IF EXISTS version_hero_description,
    DROP COLUMN IF EXISTS version_hero_primary_button_type,
    DROP COLUMN IF EXISTS version_hero_primary_button_url,
    DROP COLUMN IF EXISTS version_hero_primary_button_label,
    DROP COLUMN IF EXISTS version_hero_primary_button_appearance,
    DROP COLUMN IF EXISTS version_hero_secondary_button_type,
    DROP COLUMN IF EXISTS version_hero_secondary_button_url,
    DROP COLUMN IF EXISTS version_hero_secondary_button_label,
    DROP COLUMN IF EXISTS version_hero_secondary_button_appearance,
    DROP COLUMN IF EXISTS version_hero_background_color
  `)

  // Drop hero-related tables
  await db.execute(sql`DROP TABLE IF EXISTS pages_hero_links`)
  await db.execute(sql`DROP TABLE IF EXISTS _pages_v_version_hero_links`)
  await db.execute(sql`DROP TABLE IF EXISTS pages_blocks_hero`)
  await db.execute(sql`DROP TABLE IF EXISTS _pages_v_blocks_hero`)

  // Drop hero-related enums
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_image_position`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_primary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_primary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_secondary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_secondary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_background_color`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_links_link_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_hero_links_link_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_image_position`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_primary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_primary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_secondary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_secondary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum_pages_blocks_hero_background_color`)
  
  // Drop version-specific enums
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_version_hero_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_version_hero_links_link_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_version_hero_links_link_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_image_position`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_primary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_primary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_secondary_button_type`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_secondary_button_appearance`)
  await db.execute(sql`DROP TYPE IF EXISTS enum__pages_v_blocks_hero_background_color`)

  console.log('Successfully removed hero system from database')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // This would be complex to reverse since we'd need to recreate the entire hero schema
  // For now, we'll just log that this migration is not reversible
  console.log('WARNING: Hero system removal migration is not reversible')
  throw new Error('Hero system removal migration cannot be reversed')
}