import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_content_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_media_block_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_hero_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_age_groups_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_age_groups_archive_layout" AS ENUM('grid', 'list', 'timeline');
  CREATE TYPE "public"."enum_pages_blocks_posts_archive_populate_by" AS ENUM('collection', 'selection', 'category');
  CREATE TYPE "public"."enum_pages_blocks_posts_archive_layout" AS ENUM('grid', 'list', 'magazine');
  CREATE TYPE "public"."enum_pages_blocks_relume_header_variant" AS ENUM('header-01', 'header-05', 'header-46', 'header-47', 'header-50', 'header-54', 'header-62');
  CREATE TYPE "public"."enum_pages_blocks_relume_header_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_relume_header_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_relume_header_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_variant" AS ENUM('layout-01', 'layout-03', 'layout-10', 'layout-192', 'layout-238', 'layout-239');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_primary_button_variant" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_secondary_button_variant" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_relume_layout_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum_pages_blocks_relume_c_t_a_variant" AS ENUM('cta-02', 'cta-20', 'cta-26');
  CREATE TYPE "public"."enum_pages_blocks_relume_c_t_a_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_relume_c_t_a_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_relume_c_t_a_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_age_groups_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_age_groups_archive_layout" AS ENUM('grid', 'list', 'timeline');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_archive_populate_by" AS ENUM('collection', 'selection', 'category');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_archive_layout" AS ENUM('grid', 'list', 'magazine');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_header_variant" AS ENUM('header-01', 'header-05', 'header-46', 'header-47', 'header-50', 'header-54', 'header-62');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_header_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_header_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_header_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_variant" AS ENUM('layout-01', 'layout-03', 'layout-10', 'layout-192', 'layout-238', 'layout-239');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_primary_button_variant" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_secondary_button_variant" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_layout_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_c_t_a_variant" AS ENUM('cta-02', 'cta-20', 'cta-26');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_c_t_a_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_c_t_a_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_relume_c_t_a_background_color" AS ENUM('', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-blue-500', 'bg-blue-50', 'bg-green-500', 'bg-green-50', 'bg-orange-500', 'bg-orange-50', 'bg-red-500', 'bg-red-50', 'bg-purple-500', 'bg-purple-50', 'bg-yellow-500', 'bg-yellow-50');
  CREATE TABLE "pages_blocks_age_groups_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Voor Elke Leeftijd',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_age_groups_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"layout" "enum_pages_blocks_age_groups_archive_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Blog',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_posts_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"show_categories" boolean DEFAULT true,
  	"layout" "enum_pages_blocks_posts_archive_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_relume_header_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_relume_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_relume_header_variant" DEFAULT 'header-01',
  	"title" varchar DEFAULT 'Schermtijd weer helemaal in balans',
  	"description" varchar DEFAULT 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten.',
  	"primary_button_text" varchar DEFAULT 'Leer Meer',
  	"primary_button_link" varchar DEFAULT '#',
  	"primary_button_show" boolean DEFAULT true,
  	"secondary_button_text" varchar DEFAULT 'Aanmelden',
  	"secondary_button_link" varchar DEFAULT '#',
  	"secondary_button_show" boolean DEFAULT true,
  	"image_id" integer,
  	"background_image_id" integer,
  	"image_position" "enum_pages_blocks_relume_header_image_position" DEFAULT 'right',
  	"alignment" "enum_pages_blocks_relume_header_alignment" DEFAULT 'left',
  	"overlay_opacity" numeric DEFAULT 50,
  	"background_color" "enum_pages_blocks_relume_header_background_color" DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_relume_layout_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_relume_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_link" varchar DEFAULT '#'
  );
  
  CREATE TABLE "pages_blocks_relume_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_relume_layout_variant" DEFAULT 'layout-03',
  	"tagline" varchar,
  	"title" varchar DEFAULT 'Ontdek de voordelen van digitale media',
  	"description" varchar DEFAULT 'Digitale media kunnen een waardevolle aanvulling zijn op de ontwikkeling van uw kinderen.',
  	"primary_button_text" varchar DEFAULT 'Leer Meer',
  	"primary_button_link" varchar DEFAULT '#',
  	"primary_button_variant" "enum_pages_blocks_relume_layout_primary_button_variant" DEFAULT 'secondary',
  	"primary_button_show" boolean DEFAULT true,
  	"secondary_button_text" varchar DEFAULT 'Ontdek Meer',
  	"secondary_button_link" varchar DEFAULT '#',
  	"secondary_button_variant" "enum_pages_blocks_relume_layout_secondary_button_variant" DEFAULT 'link',
  	"secondary_button_show" boolean DEFAULT true,
  	"main_image_id" integer,
  	"image_position" "enum_pages_blocks_relume_layout_image_position" DEFAULT 'right',
  	"text_alignment" "enum_pages_blocks_relume_layout_text_alignment" DEFAULT 'left',
  	"background_color" "enum_pages_blocks_relume_layout_background_color" DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_relume_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_relume_c_t_a_variant" DEFAULT 'cta-02',
  	"title" varchar DEFAULT 'Schrijf je nu in!',
  	"description" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Inschrijven',
  	"button_variant" "enum_pages_blocks_relume_c_t_a_button_variant" DEFAULT 'primary',
  	"email_placeholder" varchar DEFAULT 'Voer je e-mail in',
  	"privacy_text" varchar DEFAULT 'Door je aan te melden ga je akkoord met onze Algemene Voorwaarden.',
  	"alignment" "enum_pages_blocks_relume_c_t_a_alignment" DEFAULT 'left',
  	"background_color" "enum_pages_blocks_relume_c_t_a_background_color" DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_age_groups_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Voor Elke Leeftijd',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_age_groups_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"layout" "enum__pages_v_blocks_age_groups_archive_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Blog',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_posts_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"show_categories" boolean DEFAULT true,
  	"layout" "enum__pages_v_blocks_posts_archive_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_header_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_relume_header_variant" DEFAULT 'header-01',
  	"title" varchar DEFAULT 'Schermtijd weer helemaal in balans',
  	"description" varchar DEFAULT 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten.',
  	"primary_button_text" varchar DEFAULT 'Leer Meer',
  	"primary_button_link" varchar DEFAULT '#',
  	"primary_button_show" boolean DEFAULT true,
  	"secondary_button_text" varchar DEFAULT 'Aanmelden',
  	"secondary_button_link" varchar DEFAULT '#',
  	"secondary_button_show" boolean DEFAULT true,
  	"image_id" integer,
  	"background_image_id" integer,
  	"image_position" "enum__pages_v_blocks_relume_header_image_position" DEFAULT 'right',
  	"alignment" "enum__pages_v_blocks_relume_header_alignment" DEFAULT 'left',
  	"overlay_opacity" numeric DEFAULT 50,
  	"background_color" "enum__pages_v_blocks_relume_header_background_color" DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_layout_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_link" varchar DEFAULT '#',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_relume_layout_variant" DEFAULT 'layout-03',
  	"tagline" varchar,
  	"title" varchar DEFAULT 'Ontdek de voordelen van digitale media',
  	"description" varchar DEFAULT 'Digitale media kunnen een waardevolle aanvulling zijn op de ontwikkeling van uw kinderen.',
  	"primary_button_text" varchar DEFAULT 'Leer Meer',
  	"primary_button_link" varchar DEFAULT '#',
  	"primary_button_variant" "enum__pages_v_blocks_relume_layout_primary_button_variant" DEFAULT 'secondary',
  	"primary_button_show" boolean DEFAULT true,
  	"secondary_button_text" varchar DEFAULT 'Ontdek Meer',
  	"secondary_button_link" varchar DEFAULT '#',
  	"secondary_button_variant" "enum__pages_v_blocks_relume_layout_secondary_button_variant" DEFAULT 'link',
  	"secondary_button_show" boolean DEFAULT true,
  	"main_image_id" integer,
  	"image_position" "enum__pages_v_blocks_relume_layout_image_position" DEFAULT 'right',
  	"text_alignment" "enum__pages_v_blocks_relume_layout_text_alignment" DEFAULT 'left',
  	"background_color" "enum__pages_v_blocks_relume_layout_background_color" DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_relume_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_relume_c_t_a_variant" DEFAULT 'cta-02',
  	"title" varchar DEFAULT 'Schrijf je nu in!',
  	"description" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Inschrijven',
  	"button_variant" "enum__pages_v_blocks_relume_c_t_a_button_variant" DEFAULT 'primary',
  	"email_placeholder" varchar DEFAULT 'Voer je e-mail in',
  	"privacy_text" varchar DEFAULT 'Door je aan te melden ga je akkoord met onze Algemene Voorwaarden.',
  	"alignment" "enum__pages_v_blocks_relume_c_t_a_alignment" DEFAULT 'left',
  	"background_color" "enum__pages_v_blocks_relume_c_t_a_background_color" DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "colors_background_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"is_default" boolean
  );
  
  CREATE TABLE "colors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "background_color" "enum_pages_blocks_cta_background_color" DEFAULT '';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "background_color" "enum_pages_blocks_content_background_color" DEFAULT '';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "background_color" "enum_pages_blocks_media_block_background_color" DEFAULT '';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_color" "enum_pages_blocks_hero_background_color" DEFAULT '';
  ALTER TABLE "pages_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "background_color" "enum__pages_v_blocks_cta_background_color" DEFAULT '';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "background_color" "enum__pages_v_blocks_content_background_color" DEFAULT '';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "background_color" "enum__pages_v_blocks_media_block_background_color" DEFAULT '';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background_color" "enum__pages_v_blocks_hero_background_color" DEFAULT '';
  ALTER TABLE "_pages_v_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "pages_blocks_age_groups_archive" ADD CONSTRAINT "pages_blocks_age_groups_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_archive" ADD CONSTRAINT "pages_blocks_posts_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_header_features" ADD CONSTRAINT "pages_blocks_relume_header_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_relume_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_header" ADD CONSTRAINT "pages_blocks_relume_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_header" ADD CONSTRAINT "pages_blocks_relume_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_header" ADD CONSTRAINT "pages_blocks_relume_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout_features" ADD CONSTRAINT "pages_blocks_relume_layout_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout_features" ADD CONSTRAINT "pages_blocks_relume_layout_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_relume_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout_columns" ADD CONSTRAINT "pages_blocks_relume_layout_columns_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout_columns" ADD CONSTRAINT "pages_blocks_relume_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_relume_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout" ADD CONSTRAINT "pages_blocks_relume_layout_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_layout" ADD CONSTRAINT "pages_blocks_relume_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_c_t_a" ADD CONSTRAINT "pages_blocks_relume_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_relume_c_t_a" ADD CONSTRAINT "pages_blocks_relume_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_age_groups_archive" ADD CONSTRAINT "_pages_v_blocks_age_groups_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_archive" ADD CONSTRAINT "_pages_v_blocks_posts_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_header_features" ADD CONSTRAINT "_pages_v_blocks_relume_header_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_relume_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_header" ADD CONSTRAINT "_pages_v_blocks_relume_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_header" ADD CONSTRAINT "_pages_v_blocks_relume_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_header" ADD CONSTRAINT "_pages_v_blocks_relume_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout_features" ADD CONSTRAINT "_pages_v_blocks_relume_layout_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout_features" ADD CONSTRAINT "_pages_v_blocks_relume_layout_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_relume_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout_columns" ADD CONSTRAINT "_pages_v_blocks_relume_layout_columns_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout_columns" ADD CONSTRAINT "_pages_v_blocks_relume_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_relume_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout" ADD CONSTRAINT "_pages_v_blocks_relume_layout_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_layout" ADD CONSTRAINT "_pages_v_blocks_relume_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_c_t_a" ADD CONSTRAINT "_pages_v_blocks_relume_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_relume_c_t_a" ADD CONSTRAINT "_pages_v_blocks_relume_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "colors_background_colors" ADD CONSTRAINT "colors_background_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_age_groups_archive_order_idx" ON "pages_blocks_age_groups_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_age_groups_archive_parent_id_idx" ON "pages_blocks_age_groups_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_age_groups_archive_path_idx" ON "pages_blocks_age_groups_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_archive_order_idx" ON "pages_blocks_posts_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_archive_parent_id_idx" ON "pages_blocks_posts_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_archive_path_idx" ON "pages_blocks_posts_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_relume_header_features_order_idx" ON "pages_blocks_relume_header_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_header_features_parent_id_idx" ON "pages_blocks_relume_header_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_header_order_idx" ON "pages_blocks_relume_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_header_parent_id_idx" ON "pages_blocks_relume_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_header_path_idx" ON "pages_blocks_relume_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_relume_header_image_idx" ON "pages_blocks_relume_header" USING btree ("image_id");
  CREATE INDEX "pages_blocks_relume_header_background_image_idx" ON "pages_blocks_relume_header" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_relume_layout_features_order_idx" ON "pages_blocks_relume_layout_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_layout_features_parent_id_idx" ON "pages_blocks_relume_layout_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_layout_features_icon_idx" ON "pages_blocks_relume_layout_features" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_relume_layout_columns_order_idx" ON "pages_blocks_relume_layout_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_layout_columns_parent_id_idx" ON "pages_blocks_relume_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_layout_columns_icon_idx" ON "pages_blocks_relume_layout_columns" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_relume_layout_order_idx" ON "pages_blocks_relume_layout" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_layout_parent_id_idx" ON "pages_blocks_relume_layout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_layout_path_idx" ON "pages_blocks_relume_layout" USING btree ("_path");
  CREATE INDEX "pages_blocks_relume_layout_main_image_idx" ON "pages_blocks_relume_layout" USING btree ("main_image_id");
  CREATE INDEX "pages_blocks_relume_c_t_a_order_idx" ON "pages_blocks_relume_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_relume_c_t_a_parent_id_idx" ON "pages_blocks_relume_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_relume_c_t_a_path_idx" ON "pages_blocks_relume_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_relume_c_t_a_image_idx" ON "pages_blocks_relume_c_t_a" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_age_groups_archive_order_idx" ON "_pages_v_blocks_age_groups_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_age_groups_archive_parent_id_idx" ON "_pages_v_blocks_age_groups_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_age_groups_archive_path_idx" ON "_pages_v_blocks_age_groups_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_archive_order_idx" ON "_pages_v_blocks_posts_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_archive_parent_id_idx" ON "_pages_v_blocks_posts_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_archive_path_idx" ON "_pages_v_blocks_posts_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_relume_header_features_order_idx" ON "_pages_v_blocks_relume_header_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_header_features_parent_id_idx" ON "_pages_v_blocks_relume_header_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_header_order_idx" ON "_pages_v_blocks_relume_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_header_parent_id_idx" ON "_pages_v_blocks_relume_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_header_path_idx" ON "_pages_v_blocks_relume_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_relume_header_image_idx" ON "_pages_v_blocks_relume_header" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_relume_header_background_image_idx" ON "_pages_v_blocks_relume_header" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_features_order_idx" ON "_pages_v_blocks_relume_layout_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_layout_features_parent_id_idx" ON "_pages_v_blocks_relume_layout_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_features_icon_idx" ON "_pages_v_blocks_relume_layout_features" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_columns_order_idx" ON "_pages_v_blocks_relume_layout_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_layout_columns_parent_id_idx" ON "_pages_v_blocks_relume_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_columns_icon_idx" ON "_pages_v_blocks_relume_layout_columns" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_order_idx" ON "_pages_v_blocks_relume_layout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_layout_parent_id_idx" ON "_pages_v_blocks_relume_layout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_layout_path_idx" ON "_pages_v_blocks_relume_layout" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_relume_layout_main_image_idx" ON "_pages_v_blocks_relume_layout" USING btree ("main_image_id");
  CREATE INDEX "_pages_v_blocks_relume_c_t_a_order_idx" ON "_pages_v_blocks_relume_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_relume_c_t_a_parent_id_idx" ON "_pages_v_blocks_relume_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_relume_c_t_a_path_idx" ON "_pages_v_blocks_relume_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_relume_c_t_a_image_idx" ON "_pages_v_blocks_relume_c_t_a" USING btree ("image_id");
  CREATE INDEX "colors_background_colors_order_idx" ON "colors_background_colors" USING btree ("_order");
  CREATE INDEX "colors_background_colors_parent_id_idx" ON "colors_background_colors" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_age_groups_id_idx" ON "pages_rels" USING btree ("age_groups_id");
  CREATE INDEX "_pages_v_rels_age_groups_id_idx" ON "_pages_v_rels" USING btree ("age_groups_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_age_groups_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_posts_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_header_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_layout_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_layout_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_relume_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_age_groups_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_posts_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_header_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_layout_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_layout_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_relume_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "colors_background_colors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "colors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_age_groups_archive" CASCADE;
  DROP TABLE "pages_blocks_posts_archive" CASCADE;
  DROP TABLE "pages_blocks_relume_header_features" CASCADE;
  DROP TABLE "pages_blocks_relume_header" CASCADE;
  DROP TABLE "pages_blocks_relume_layout_features" CASCADE;
  DROP TABLE "pages_blocks_relume_layout_columns" CASCADE;
  DROP TABLE "pages_blocks_relume_layout" CASCADE;
  DROP TABLE "pages_blocks_relume_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_age_groups_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_header_features" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_header" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_layout_features" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_layout_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_layout" CASCADE;
  DROP TABLE "_pages_v_blocks_relume_c_t_a" CASCADE;
  DROP TABLE "colors_background_colors" CASCADE;
  DROP TABLE "colors" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_age_groups_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_age_groups_fk";
  
  DROP INDEX "pages_rels_age_groups_id_idx";
  DROP INDEX "_pages_v_rels_age_groups_id_idx";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "background_color";
  ALTER TABLE "pages_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "age_groups_id";
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_media_block_background_color";
  DROP TYPE "public"."enum_pages_blocks_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_age_groups_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_age_groups_archive_layout";
  DROP TYPE "public"."enum_pages_blocks_posts_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_posts_archive_layout";
  DROP TYPE "public"."enum_pages_blocks_relume_header_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_header_image_position";
  DROP TYPE "public"."enum_pages_blocks_relume_header_alignment";
  DROP TYPE "public"."enum_pages_blocks_relume_header_background_color";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_primary_button_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_secondary_button_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_image_position";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_relume_layout_background_color";
  DROP TYPE "public"."enum_pages_blocks_relume_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_c_t_a_button_variant";
  DROP TYPE "public"."enum_pages_blocks_relume_c_t_a_alignment";
  DROP TYPE "public"."enum_pages_blocks_relume_c_t_a_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_age_groups_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_age_groups_archive_layout";
  DROP TYPE "public"."enum__pages_v_blocks_posts_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_posts_archive_layout";
  DROP TYPE "public"."enum__pages_v_blocks_relume_header_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_header_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_relume_header_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_relume_header_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_primary_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_secondary_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_relume_layout_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_relume_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_c_t_a_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_relume_c_t_a_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_relume_c_t_a_background_color";`)
}
