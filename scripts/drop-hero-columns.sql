-- Drop hero columns from pages table
ALTER TABLE pages DROP COLUMN IF EXISTS hero_type;
ALTER TABLE pages DROP COLUMN IF EXISTS hero_rich_text;
ALTER TABLE pages DROP COLUMN IF EXISTS hero_media_id;

-- Drop hero columns from versioned pages table
ALTER TABLE _pages_v DROP COLUMN IF EXISTS version_hero_type;
ALTER TABLE _pages_v DROP COLUMN IF EXISTS version_hero_rich_text;
ALTER TABLE _pages_v DROP COLUMN IF EXISTS version_hero_media_id;

-- Drop the hero_type enum if it exists
DROP TYPE IF EXISTS enum_pages_hero_type;

-- Drop hero links table if it exists
DROP TABLE IF EXISTS pages_hero_links;
DROP TABLE IF EXISTS _pages_v_version_hero_links;

-- Drop any hero block tables that might still exist
DROP TABLE IF EXISTS pages_blocks_hero;
DROP TABLE IF EXISTS _pages_v_blocks_hero;

SELECT 'Hero columns and tables dropped successfully!' as result;