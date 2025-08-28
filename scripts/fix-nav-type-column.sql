-- First drop the column and recreate it properly
ALTER TABLE header_nav_items DROP COLUMN IF EXISTS type;

-- Create enum for the type field if it doesn't exist
DO $$ BEGIN
    CREATE TYPE enum_header_nav_items_type AS ENUM('link', 'dropdown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add the column with the enum type and default value
ALTER TABLE header_nav_items 
ADD COLUMN type enum_header_nav_items_type DEFAULT 'link';

SELECT 'Fixed type column in header_nav_items' as result;