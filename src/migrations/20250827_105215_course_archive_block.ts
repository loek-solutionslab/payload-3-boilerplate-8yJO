import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_button_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_button_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_faq_filter_by_category" AS ENUM('', 'general', 'screen-time', 'baby', 'toddler', 'preschooler', 'elementary', 'courses', 'daycare', 'municipality', 'school');
  CREATE TYPE "public"."enum_pages_blocks_course_archive_target_audience" AS ENUM('parents', 'daycare', 'schools', 'municipalities');
  CREATE TYPE "public"."enum_pages_blocks_course_archive_populate_by" AS ENUM('collection', 'selection', 'targetAudience');
  CREATE TYPE "public"."enum_pages_blocks_course_archive_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_button_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_button_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_filter_by_category" AS ENUM('', 'general', 'screen-time', 'baby', 'toddler', 'preschooler', 'elementary', 'courses', 'daycare', 'municipality', 'school');
  CREATE TYPE "public"."enum__pages_v_blocks_course_archive_target_audience" AS ENUM('parents', 'daycare', 'schools', 'municipalities');
  CREATE TYPE "public"."enum__pages_v_blocks_course_archive_populate_by" AS ENUM('collection', 'selection', 'targetAudience');
  CREATE TYPE "public"."enum__pages_v_blocks_course_archive_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_site_settings_notifications_type" AS ENUM('info', 'warning', 'success', 'error');
  CREATE TYPE "public"."enum_site_settings_forms_newsletter_provider" AS ENUM('mailchimp', 'convertkit', 'klaviyo', 'custom');
  CREATE TABLE "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_features_features_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_features_features_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Schrijf je nu in!',
  	"description" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"button_text" varchar DEFAULT 'Inschrijven',
  	"image_id" integer,
  	"privacy_text" varchar DEFAULT 'Door op Inschrijven te klikken, ga je akkoord met onze <a href="/privacy" class="underline">Algemene Voorwaarden</a>.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_hero_image_position" DEFAULT 'right',
  	"primary_button_type" "enum_pages_blocks_hero_primary_button_type" DEFAULT 'reference',
  	"primary_button_new_tab" boolean,
  	"primary_button_url" varchar,
  	"primary_button_label" varchar,
  	"primary_button_appearance" "enum_pages_blocks_hero_primary_button_appearance" DEFAULT 'default',
  	"secondary_button_type" "enum_pages_blocks_hero_secondary_button_type" DEFAULT 'reference',
  	"secondary_button_new_tab" boolean,
  	"secondary_button_url" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_appearance" "enum_pages_blocks_hero_secondary_button_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Veelgestelde Vragen',
  	"description" varchar,
  	"filter_by_category" "enum_pages_blocks_faq_filter_by_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_course_archive_target_audience" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_course_archive_target_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_course_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Cursussen & Trainingen',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_course_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"show_categories" boolean DEFAULT true,
  	"layout" "enum_pages_blocks_course_archive_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_features_features_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_features_features_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Schrijf je nu in!',
  	"description" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"button_text" varchar DEFAULT 'Inschrijven',
  	"image_id" integer,
  	"privacy_text" varchar DEFAULT 'Door op Inschrijven te klikken, ga je akkoord met onze <a href="/privacy" class="underline">Algemene Voorwaarden</a>.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_hero_image_position" DEFAULT 'right',
  	"primary_button_type" "enum__pages_v_blocks_hero_primary_button_type" DEFAULT 'reference',
  	"primary_button_new_tab" boolean,
  	"primary_button_url" varchar,
  	"primary_button_label" varchar,
  	"primary_button_appearance" "enum__pages_v_blocks_hero_primary_button_appearance" DEFAULT 'default',
  	"secondary_button_type" "enum__pages_v_blocks_hero_secondary_button_type" DEFAULT 'reference',
  	"secondary_button_new_tab" boolean,
  	"secondary_button_url" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_appearance" "enum__pages_v_blocks_hero_secondary_button_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Veelgestelde Vragen',
  	"description" varchar,
  	"filter_by_category" "enum__pages_v_blocks_faq_filter_by_category",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_course_archive_target_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_course_archive_target_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_course_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Cursussen & Trainingen',
  	"description" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_course_archive_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 10,
  	"show_categories" boolean DEFAULT true,
  	"layout" "enum__pages_v_blocks_course_archive_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings_maintenance_allowed_i_ps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ip" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Schermblij' NOT NULL,
  	"site_description" varchar DEFAULT 'Hulp bij het vinden van de perfecte balans tussen schermtijd en offline activiteiten voor kinderen.' NOT NULL,
  	"default_s_e_o_title" varchar DEFAULT 'Schermblij - Gezonde schermtijd voor kinderen',
  	"default_s_e_o_description" varchar DEFAULT 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten. Ontdek hoe digitale media een waardevolle aanvulling kan zijn op het leven van uw kinderen.',
  	"default_s_e_o_keywords" varchar DEFAULT 'schermtijd, kinderen, opvoeding, digitale media, balans, ouders, educatie',
  	"default_s_e_o_og_image_id" integer,
  	"analytics_google_analytics_id" varchar,
  	"analytics_google_tag_manager_id" varchar,
  	"analytics_facebook_pixel_id" varchar,
  	"maintenance_enabled" boolean DEFAULT false,
  	"maintenance_message" jsonb,
  	"notifications_enabled" boolean DEFAULT false,
  	"notifications_type" "enum_site_settings_notifications_type" DEFAULT 'info',
  	"notifications_message" jsonb,
  	"notifications_dismissible" boolean DEFAULT true,
  	"forms_contact_email" varchar NOT NULL,
  	"forms_newsletter_provider" "enum_site_settings_forms_newsletter_provider",
  	"forms_recaptcha_site_key" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_c_t_a" ADD CONSTRAINT "pages_blocks_newsletter_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_c_t_a" ADD CONSTRAINT "pages_blocks_newsletter_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_archive_target_audience" ADD CONSTRAINT "pages_blocks_course_archive_target_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_course_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_archive" ADD CONSTRAINT "pages_blocks_course_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_c_t_a" ADD CONSTRAINT "_pages_v_blocks_newsletter_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_c_t_a" ADD CONSTRAINT "_pages_v_blocks_newsletter_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_course_archive_target_audience" ADD CONSTRAINT "_pages_v_blocks_course_archive_target_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_course_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_course_archive" ADD CONSTRAINT "_pages_v_blocks_course_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_maintenance_allowed_i_ps" ADD CONSTRAINT "site_settings_maintenance_allowed_i_ps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_s_e_o_og_image_id_media_id_fk" FOREIGN KEY ("default_s_e_o_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_features_icon_idx" ON "pages_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_c_t_a_order_idx" ON "pages_blocks_newsletter_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_c_t_a_parent_id_idx" ON "pages_blocks_newsletter_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_c_t_a_path_idx" ON "pages_blocks_newsletter_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_c_t_a_image_idx" ON "pages_blocks_newsletter_c_t_a" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_course_archive_target_audience_order_idx" ON "pages_blocks_course_archive_target_audience" USING btree ("order");
  CREATE INDEX "pages_blocks_course_archive_target_audience_parent_idx" ON "pages_blocks_course_archive_target_audience" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_course_archive_order_idx" ON "pages_blocks_course_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_course_archive_parent_id_idx" ON "pages_blocks_course_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_course_archive_path_idx" ON "pages_blocks_course_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_features_icon_idx" ON "_pages_v_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_c_t_a_order_idx" ON "_pages_v_blocks_newsletter_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_c_t_a_parent_id_idx" ON "_pages_v_blocks_newsletter_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_c_t_a_path_idx" ON "_pages_v_blocks_newsletter_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_c_t_a_image_idx" ON "_pages_v_blocks_newsletter_c_t_a" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_course_archive_target_audience_order_idx" ON "_pages_v_blocks_course_archive_target_audience" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_course_archive_target_audience_parent_idx" ON "_pages_v_blocks_course_archive_target_audience" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_course_archive_order_idx" ON "_pages_v_blocks_course_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_course_archive_parent_id_idx" ON "_pages_v_blocks_course_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_course_archive_path_idx" ON "_pages_v_blocks_course_archive" USING btree ("_path");
  CREATE INDEX "site_settings_maintenance_allowed_i_ps_order_idx" ON "site_settings_maintenance_allowed_i_ps" USING btree ("_order");
  CREATE INDEX "site_settings_maintenance_allowed_i_ps_parent_id_idx" ON "site_settings_maintenance_allowed_i_ps" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_s_e_o_default_s_e_o_og_image_idx" ON "site_settings" USING btree ("default_s_e_o_og_image_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_faq_id_idx" ON "pages_rels" USING btree ("faq_id");
  CREATE INDEX "pages_rels_courses_id_idx" ON "pages_rels" USING btree ("courses_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_faq_id_idx" ON "_pages_v_rels" USING btree ("faq_id");
  CREATE INDEX "_pages_v_rels_courses_id_idx" ON "_pages_v_rels" USING btree ("courses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_course_archive_target_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_course_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_course_archive_target_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_course_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_maintenance_allowed_i_ps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_newsletter_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_course_archive_target_audience" CASCADE;
  DROP TABLE "pages_blocks_course_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_course_archive_target_audience" CASCADE;
  DROP TABLE "_pages_v_blocks_course_archive" CASCADE;
  DROP TABLE "site_settings_maintenance_allowed_i_ps" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_testimonials_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_faq_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_courses_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_testimonials_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_faq_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_courses_fk";
  
  DROP INDEX "pages_rels_testimonials_id_idx";
  DROP INDEX "pages_rels_faq_id_idx";
  DROP INDEX "pages_rels_courses_id_idx";
  DROP INDEX "_pages_v_rels_testimonials_id_idx";
  DROP INDEX "_pages_v_rels_faq_id_idx";
  DROP INDEX "_pages_v_rels_courses_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "pages_rels" DROP COLUMN "faq_id";
  ALTER TABLE "pages_rels" DROP COLUMN "courses_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "faq_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "courses_id";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_type";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_image_position";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_button_type";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_button_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_button_type";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_button_appearance";
  DROP TYPE "public"."enum_pages_blocks_faq_filter_by_category";
  DROP TYPE "public"."enum_pages_blocks_course_archive_target_audience";
  DROP TYPE "public"."enum_pages_blocks_course_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_course_archive_layout";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_button_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_button_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_faq_filter_by_category";
  DROP TYPE "public"."enum__pages_v_blocks_course_archive_target_audience";
  DROP TYPE "public"."enum__pages_v_blocks_course_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_course_archive_layout";
  DROP TYPE "public"."enum_site_settings_notifications_type";
  DROP TYPE "public"."enum_site_settings_forms_newsletter_provider";`)
}
