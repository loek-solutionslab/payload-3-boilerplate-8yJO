-- Drop tables if they exist first (in case of partial creation)
DROP TABLE IF EXISTS header_nav_items_dropdown_sections_links;
DROP TABLE IF EXISTS header_nav_items_dropdown_sections;

-- Create missing header dropdown sections table
CREATE TABLE header_nav_items_dropdown_sections (
    id CHARACTER VARYING PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title CHARACTER VARYING,
    _order INTEGER DEFAULT 1,
    _parent_id CHARACTER VARYING NOT NULL,
    updated_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY (_parent_id) REFERENCES header_nav_items(id) ON DELETE CASCADE
);

-- Create missing header dropdown sections links table
CREATE TABLE header_nav_items_dropdown_sections_links (
    id CHARACTER VARYING PRIMARY KEY DEFAULT gen_random_uuid()::text,
    icon_id INTEGER,
    link_type CHARACTER VARYING DEFAULT 'custom',
    link_new_tab BOOLEAN DEFAULT false,
    link_url CHARACTER VARYING,
    link_label CHARACTER VARYING,
    description CHARACTER VARYING,
    _order INTEGER DEFAULT 1,
    _parent_id CHARACTER VARYING NOT NULL,
    updated_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY (_parent_id) REFERENCES header_nav_items_dropdown_sections(id) ON DELETE CASCADE,
    FOREIGN KEY (icon_id) REFERENCES media(id) ON DELETE SET NULL
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS header_nav_items_dropdown_sections_parent_id_idx 
ON header_nav_items_dropdown_sections(_parent_id);

CREATE INDEX IF NOT EXISTS header_nav_items_dropdown_sections_order_idx 
ON header_nav_items_dropdown_sections(_order);

CREATE INDEX IF NOT EXISTS header_nav_items_dropdown_sections_links_parent_id_idx 
ON header_nav_items_dropdown_sections_links(_parent_id);

CREATE INDEX IF NOT EXISTS header_nav_items_dropdown_sections_links_order_idx 
ON header_nav_items_dropdown_sections_links(_order);

CREATE INDEX IF NOT EXISTS header_nav_items_dropdown_sections_links_icon_idx 
ON header_nav_items_dropdown_sections_links(icon_id);

SELECT 'Header dropdown tables created successfully!' as result;