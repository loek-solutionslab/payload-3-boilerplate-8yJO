-- Add missing type column to header_nav_items table
ALTER TABLE header_nav_items 
ADD COLUMN IF NOT EXISTS type VARCHAR DEFAULT 'link';

-- Create enum for the type field if it doesn't exist
DO $$ BEGIN
    CREATE TYPE enum_header_nav_items_type AS ENUM('link', 'dropdown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the column to use the enum
ALTER TABLE header_nav_items 
ALTER COLUMN type TYPE enum_header_nav_items_type USING type::enum_header_nav_items_type;

SELECT 'Added type column to header_nav_items' as result;