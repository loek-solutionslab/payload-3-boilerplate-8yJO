import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_target_audience" AS ENUM('parents', 'daycare', 'schools', 'municipalities');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_version_target_audience" AS ENUM('parents', 'daycare', 'schools', 'municipalities');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_age_groups_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_age_groups_resources_type" AS ENUM('article', 'video', 'app', 'website', 'book');
  CREATE TYPE "public"."enum_age_groups_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__age_groups_v_version_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__age_groups_v_version_resources_type" AS ENUM('article', 'video', 'app', 'website', 'book');
  CREATE TYPE "public"."enum__age_groups_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_service_type" AS ENUM('daycare', 'municipality', 'school', 'parents', 'general');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_service_type" AS ENUM('daycare', 'municipality', 'school', 'parents', 'general');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_tags" AS ENUM('screen-time', 'parenting', 'education', 'balance', 'baby', 'toddler', 'preschooler', 'elementary');
  CREATE TYPE "public"."enum_testimonials_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_testimonials_service_used" AS ENUM('general', 'course', 'daycare', 'municipality', 'school');
  CREATE TYPE "public"."enum_faq_tags" AS ENUM('parenting', 'education', 'balance', 'safety', 'development', 'media', 'apps', 'games', 'videos', 'social-media');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('general', 'screen-time', 'baby', 'toddler', 'preschooler', 'elementary', 'courses', 'daycare', 'municipality', 'school', 'technical');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "courses_target_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_courses_target_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "courses_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"full_description" jsonb,
  	"image_id" integer,
  	"price" numeric,
  	"duration" varchar,
  	"published_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "courses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_courses_v_version_target_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__courses_v_version_target_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_full_description" jsonb,
  	"version_image_id" integer,
  	"version_price" numeric,
  	"version_duration" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_courses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "age_groups_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_age_groups_content_image_position" DEFAULT 'right'
  );
  
  CREATE TABLE "age_groups_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tip" varchar
  );
  
  CREATE TABLE "age_groups_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"link" varchar,
  	"type" "enum_age_groups_resources_type"
  );
  
  CREATE TABLE "age_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"age_range" varchar,
  	"description" varchar,
  	"hero_image_id" integer,
  	"order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_age_groups_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "age_groups_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer,
  	"courses_id" integer
  );
  
  CREATE TABLE "_age_groups_v_version_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__age_groups_v_version_content_image_position" DEFAULT 'right',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_age_groups_v_version_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tip" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_age_groups_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"link" varchar,
  	"type" "enum__age_groups_v_version_resources_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_age_groups_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_age_range" varchar,
  	"version_description" varchar,
  	"version_hero_image_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__age_groups_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_age_groups_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer,
  	"courses_id" integer
  );
  
  CREATE TABLE "services_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"service_type" "enum_services_service_type",
  	"description" varchar,
  	"hero_image_id" integer,
  	"pricing_has_custom_pricing" boolean DEFAULT false,
  	"pricing_price" numeric,
  	"pricing_price_description" varchar,
  	"call_to_action_title" varchar DEFAULT 'Neem contact op',
  	"call_to_action_description" varchar,
  	"call_to_action_button_text" varchar DEFAULT 'Contact',
  	"call_to_action_button_link" varchar DEFAULT '/contact',
  	"published_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_services_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_service_type" "enum__services_v_version_service_type",
  	"version_description" varchar,
  	"version_hero_image_id" integer,
  	"version_pricing_has_custom_pricing" boolean DEFAULT false,
  	"version_pricing_price" numeric,
  	"version_pricing_price_description" varchar,
  	"version_call_to_action_title" varchar DEFAULT 'Neem contact op',
  	"version_call_to_action_description" varchar,
  	"version_call_to_action_button_text" varchar DEFAULT 'Contact',
  	"version_call_to_action_button_link" varchar DEFAULT '/contact',
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "testimonials_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_testimonials_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"content" varchar NOT NULL,
  	"rating" "enum_testimonials_rating" DEFAULT '5' NOT NULL,
  	"avatar_id" integer,
  	"service_used" "enum_testimonials_service_used" DEFAULT 'general',
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL
  );
  
  CREATE TABLE "team_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"qualification" varchar NOT NULL,
  	"institution" varchar,
  	"year" numeric
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"bio" jsonb NOT NULL,
  	"social_media_linkedin" varchar,
  	"social_media_twitter" varchar,
  	"social_media_instagram" varchar,
  	"social_media_website" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"active" boolean DEFAULT true,
  	"featured_quote" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_faq_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faq_category" NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"active" boolean DEFAULT true,
  	"helpful" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer
  );
  
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_target_audience" ADD CONSTRAINT "courses_target_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_features" ADD CONSTRAINT "courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_sessions" ADD CONSTRAINT "courses_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_target_audience" ADD CONSTRAINT "_courses_v_version_target_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_features" ADD CONSTRAINT "_courses_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_sessions" ADD CONSTRAINT "_courses_v_version_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups_content" ADD CONSTRAINT "age_groups_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "age_groups_content" ADD CONSTRAINT "age_groups_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups_tips" ADD CONSTRAINT "age_groups_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups_resources" ADD CONSTRAINT "age_groups_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "age_groups_rels" ADD CONSTRAINT "age_groups_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups_rels" ADD CONSTRAINT "age_groups_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups_rels" ADD CONSTRAINT "age_groups_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v_version_content" ADD CONSTRAINT "_age_groups_v_version_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_age_groups_v_version_content" ADD CONSTRAINT "_age_groups_v_version_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_age_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v_version_tips" ADD CONSTRAINT "_age_groups_v_version_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_age_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v_version_resources" ADD CONSTRAINT "_age_groups_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_age_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v" ADD CONSTRAINT "_age_groups_v_parent_id_age_groups_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."age_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_age_groups_v" ADD CONSTRAINT "_age_groups_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_age_groups_v" ADD CONSTRAINT "_age_groups_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_age_groups_v_rels" ADD CONSTRAINT "_age_groups_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_age_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v_rels" ADD CONSTRAINT "_age_groups_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_age_groups_v_rels" ADD CONSTRAINT "_age_groups_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_benefits" ADD CONSTRAINT "services_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_benefits" ADD CONSTRAINT "_services_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_process" ADD CONSTRAINT "_services_v_version_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_tags" ADD CONSTRAINT "testimonials_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_expertise" ADD CONSTRAINT "team_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_qualifications" ADD CONSTRAINT "team_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_tags" ADD CONSTRAINT "faq_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "courses_target_audience_order_idx" ON "courses_target_audience" USING btree ("order");
  CREATE INDEX "courses_target_audience_parent_idx" ON "courses_target_audience" USING btree ("parent_id");
  CREATE INDEX "courses_features_order_idx" ON "courses_features" USING btree ("_order");
  CREATE INDEX "courses_features_parent_id_idx" ON "courses_features" USING btree ("_parent_id");
  CREATE INDEX "courses_sessions_order_idx" ON "courses_sessions" USING btree ("_order");
  CREATE INDEX "courses_sessions_parent_id_idx" ON "courses_sessions" USING btree ("_parent_id");
  CREATE INDEX "courses_image_idx" ON "courses" USING btree ("image_id");
  CREATE INDEX "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
  CREATE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
  CREATE INDEX "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
  CREATE INDEX "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
  CREATE INDEX "courses_rels_testimonials_id_idx" ON "courses_rels" USING btree ("testimonials_id");
  CREATE INDEX "_courses_v_version_target_audience_order_idx" ON "_courses_v_version_target_audience" USING btree ("order");
  CREATE INDEX "_courses_v_version_target_audience_parent_idx" ON "_courses_v_version_target_audience" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_features_order_idx" ON "_courses_v_version_features" USING btree ("_order");
  CREATE INDEX "_courses_v_version_features_parent_id_idx" ON "_courses_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_sessions_order_idx" ON "_courses_v_version_sessions" USING btree ("_order");
  CREATE INDEX "_courses_v_version_sessions_parent_id_idx" ON "_courses_v_version_sessions" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_image_idx" ON "_courses_v" USING btree ("version_image_id");
  CREATE INDEX "_courses_v_version_meta_version_meta_image_idx" ON "_courses_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "_courses_v_autosave_idx" ON "_courses_v" USING btree ("autosave");
  CREATE INDEX "_courses_v_rels_order_idx" ON "_courses_v_rels" USING btree ("order");
  CREATE INDEX "_courses_v_rels_parent_idx" ON "_courses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_courses_v_rels_path_idx" ON "_courses_v_rels" USING btree ("path");
  CREATE INDEX "_courses_v_rels_testimonials_id_idx" ON "_courses_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "age_groups_content_order_idx" ON "age_groups_content" USING btree ("_order");
  CREATE INDEX "age_groups_content_parent_id_idx" ON "age_groups_content" USING btree ("_parent_id");
  CREATE INDEX "age_groups_content_image_idx" ON "age_groups_content" USING btree ("image_id");
  CREATE INDEX "age_groups_tips_order_idx" ON "age_groups_tips" USING btree ("_order");
  CREATE INDEX "age_groups_tips_parent_id_idx" ON "age_groups_tips" USING btree ("_parent_id");
  CREATE INDEX "age_groups_resources_order_idx" ON "age_groups_resources" USING btree ("_order");
  CREATE INDEX "age_groups_resources_parent_id_idx" ON "age_groups_resources" USING btree ("_parent_id");
  CREATE INDEX "age_groups_hero_image_idx" ON "age_groups" USING btree ("hero_image_id");
  CREATE INDEX "age_groups_meta_meta_image_idx" ON "age_groups" USING btree ("meta_image_id");
  CREATE INDEX "age_groups_slug_idx" ON "age_groups" USING btree ("slug");
  CREATE INDEX "age_groups_updated_at_idx" ON "age_groups" USING btree ("updated_at");
  CREATE INDEX "age_groups_created_at_idx" ON "age_groups" USING btree ("created_at");
  CREATE INDEX "age_groups__status_idx" ON "age_groups" USING btree ("_status");
  CREATE INDEX "age_groups_rels_order_idx" ON "age_groups_rels" USING btree ("order");
  CREATE INDEX "age_groups_rels_parent_idx" ON "age_groups_rels" USING btree ("parent_id");
  CREATE INDEX "age_groups_rels_path_idx" ON "age_groups_rels" USING btree ("path");
  CREATE INDEX "age_groups_rels_faq_id_idx" ON "age_groups_rels" USING btree ("faq_id");
  CREATE INDEX "age_groups_rels_courses_id_idx" ON "age_groups_rels" USING btree ("courses_id");
  CREATE INDEX "_age_groups_v_version_content_order_idx" ON "_age_groups_v_version_content" USING btree ("_order");
  CREATE INDEX "_age_groups_v_version_content_parent_id_idx" ON "_age_groups_v_version_content" USING btree ("_parent_id");
  CREATE INDEX "_age_groups_v_version_content_image_idx" ON "_age_groups_v_version_content" USING btree ("image_id");
  CREATE INDEX "_age_groups_v_version_tips_order_idx" ON "_age_groups_v_version_tips" USING btree ("_order");
  CREATE INDEX "_age_groups_v_version_tips_parent_id_idx" ON "_age_groups_v_version_tips" USING btree ("_parent_id");
  CREATE INDEX "_age_groups_v_version_resources_order_idx" ON "_age_groups_v_version_resources" USING btree ("_order");
  CREATE INDEX "_age_groups_v_version_resources_parent_id_idx" ON "_age_groups_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_age_groups_v_parent_idx" ON "_age_groups_v" USING btree ("parent_id");
  CREATE INDEX "_age_groups_v_version_version_hero_image_idx" ON "_age_groups_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_age_groups_v_version_meta_version_meta_image_idx" ON "_age_groups_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_age_groups_v_version_version_slug_idx" ON "_age_groups_v" USING btree ("version_slug");
  CREATE INDEX "_age_groups_v_version_version_updated_at_idx" ON "_age_groups_v" USING btree ("version_updated_at");
  CREATE INDEX "_age_groups_v_version_version_created_at_idx" ON "_age_groups_v" USING btree ("version_created_at");
  CREATE INDEX "_age_groups_v_version_version__status_idx" ON "_age_groups_v" USING btree ("version__status");
  CREATE INDEX "_age_groups_v_created_at_idx" ON "_age_groups_v" USING btree ("created_at");
  CREATE INDEX "_age_groups_v_updated_at_idx" ON "_age_groups_v" USING btree ("updated_at");
  CREATE INDEX "_age_groups_v_latest_idx" ON "_age_groups_v" USING btree ("latest");
  CREATE INDEX "_age_groups_v_autosave_idx" ON "_age_groups_v" USING btree ("autosave");
  CREATE INDEX "_age_groups_v_rels_order_idx" ON "_age_groups_v_rels" USING btree ("order");
  CREATE INDEX "_age_groups_v_rels_parent_idx" ON "_age_groups_v_rels" USING btree ("parent_id");
  CREATE INDEX "_age_groups_v_rels_path_idx" ON "_age_groups_v_rels" USING btree ("path");
  CREATE INDEX "_age_groups_v_rels_faq_id_idx" ON "_age_groups_v_rels" USING btree ("faq_id");
  CREATE INDEX "_age_groups_v_rels_courses_id_idx" ON "_age_groups_v_rels" USING btree ("courses_id");
  CREATE INDEX "services_benefits_order_idx" ON "services_benefits" USING btree ("_order");
  CREATE INDEX "services_benefits_parent_id_idx" ON "services_benefits" USING btree ("_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_features_image_idx" ON "services_features" USING btree ("image_id");
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_version_benefits_order_idx" ON "_services_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_services_v_version_benefits_parent_id_idx" ON "_services_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_features_image_idx" ON "_services_v_version_features" USING btree ("image_id");
  CREATE INDEX "_services_v_version_process_order_idx" ON "_services_v_version_process" USING btree ("_order");
  CREATE INDEX "_services_v_version_process_parent_id_idx" ON "_services_v_version_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_hero_image_idx" ON "_services_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "testimonials_tags_order_idx" ON "testimonials_tags" USING btree ("order");
  CREATE INDEX "testimonials_tags_parent_idx" ON "testimonials_tags" USING btree ("parent_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "team_expertise_order_idx" ON "team_expertise" USING btree ("_order");
  CREATE INDEX "team_expertise_parent_id_idx" ON "team_expertise" USING btree ("_parent_id");
  CREATE INDEX "team_qualifications_order_idx" ON "team_qualifications" USING btree ("_order");
  CREATE INDEX "team_qualifications_parent_id_idx" ON "team_qualifications" USING btree ("_parent_id");
  CREATE INDEX "team_image_idx" ON "team" USING btree ("image_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "faq_tags_order_idx" ON "faq_tags" USING btree ("order");
  CREATE INDEX "faq_tags_parent_idx" ON "faq_tags" USING btree ("parent_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "faq_rels_order_idx" ON "faq_rels" USING btree ("order");
  CREATE INDEX "faq_rels_parent_idx" ON "faq_rels" USING btree ("parent_id");
  CREATE INDEX "faq_rels_path_idx" ON "faq_rels" USING btree ("path");
  CREATE INDEX "faq_rels_faq_id_idx" ON "faq_rels" USING btree ("faq_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_age_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("age_groups_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_target_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_target_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups_tips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_age_groups_v_version_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_age_groups_v_version_tips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_age_groups_v_version_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_age_groups_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_age_groups_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_qualifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "courses_target_audience" CASCADE;
  DROP TABLE "courses_features" CASCADE;
  DROP TABLE "courses_sessions" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_rels" CASCADE;
  DROP TABLE "_courses_v_version_target_audience" CASCADE;
  DROP TABLE "_courses_v_version_features" CASCADE;
  DROP TABLE "_courses_v_version_sessions" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "_courses_v_rels" CASCADE;
  DROP TABLE "age_groups_content" CASCADE;
  DROP TABLE "age_groups_tips" CASCADE;
  DROP TABLE "age_groups_resources" CASCADE;
  DROP TABLE "age_groups" CASCADE;
  DROP TABLE "age_groups_rels" CASCADE;
  DROP TABLE "_age_groups_v_version_content" CASCADE;
  DROP TABLE "_age_groups_v_version_tips" CASCADE;
  DROP TABLE "_age_groups_v_version_resources" CASCADE;
  DROP TABLE "_age_groups_v" CASCADE;
  DROP TABLE "_age_groups_v_rels" CASCADE;
  DROP TABLE "services_benefits" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_benefits" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v_version_process" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "testimonials_tags" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "team_expertise" CASCADE;
  DROP TABLE "team_qualifications" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "faq_tags" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "faq_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_age_groups_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_age_groups_id_idx";
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_id_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "forms_blocks_select" DROP COLUMN "placeholder";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_id";
  DROP TYPE "public"."enum_courses_target_audience";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_version_target_audience";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_age_groups_content_image_position";
  DROP TYPE "public"."enum_age_groups_resources_type";
  DROP TYPE "public"."enum_age_groups_status";
  DROP TYPE "public"."enum__age_groups_v_version_content_image_position";
  DROP TYPE "public"."enum__age_groups_v_version_resources_type";
  DROP TYPE "public"."enum__age_groups_v_version_status";
  DROP TYPE "public"."enum_services_service_type";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_service_type";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_testimonials_tags";
  DROP TYPE "public"."enum_testimonials_rating";
  DROP TYPE "public"."enum_testimonials_service_used";
  DROP TYPE "public"."enum_faq_tags";
  DROP TYPE "public"."enum_faq_category";`)
}
