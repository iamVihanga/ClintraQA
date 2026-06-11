import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_faq_block_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_theme" AS ENUM('light', 'dark');
  CREATE TABLE "pages_blocks_resources_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_all" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"subtitle" varchar,
  	"theme" "enum_pages_blocks_faq_block_theme" DEFAULT 'light',
  	"filter_category" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resources_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_all" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"subtitle" varchar,
  	"theme" "enum__pages_v_blocks_faq_block_theme" DEFAULT 'light',
  	"filter_category" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "contact_info_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "pages_blocks_resources_grid" ADD CONSTRAINT "pages_blocks_resources_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resources_grid" ADD CONSTRAINT "_pages_v_blocks_resources_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_resources_grid_order_idx" ON "pages_blocks_resources_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_resources_grid_parent_id_idx" ON "pages_blocks_resources_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resources_grid_path_idx" ON "pages_blocks_resources_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resources_grid_order_idx" ON "_pages_v_blocks_resources_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resources_grid_parent_id_idx" ON "_pages_v_blocks_resources_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resources_grid_path_idx" ON "_pages_v_blocks_resources_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  CREATE INDEX "faq_items_order_idx" ON "faq_items" USING btree ("_order");
  CREATE INDEX "faq_items_parent_id_idx" ON "faq_items" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_rels" ADD CONSTRAINT "contact_info_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_resources_id_idx" ON "pages_rels" USING btree ("resources_id");
  CREATE INDEX "_pages_v_rels_resources_id_idx" ON "_pages_v_rels" USING btree ("resources_id");
  CREATE INDEX "header_rels_resources_id_idx" ON "header_rels" USING btree ("resources_id");
  CREATE INDEX "footer_rels_resources_id_idx" ON "footer_rels" USING btree ("resources_id");
  CREATE INDEX "contact_info_rels_resources_id_idx" ON "contact_info_rels" USING btree ("resources_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_resources_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_resources_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_resources_grid" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_resources_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "faq" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_resources_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_resources_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_resources_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_resources_fk";
  
  ALTER TABLE "contact_info_rels" DROP CONSTRAINT "contact_info_rels_resources_fk";
  
  DROP INDEX "pages_rels_resources_id_idx";
  DROP INDEX "_pages_v_rels_resources_id_idx";
  DROP INDEX "header_rels_resources_id_idx";
  DROP INDEX "footer_rels_resources_id_idx";
  DROP INDEX "contact_info_rels_resources_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "resources_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "resources_id";
  ALTER TABLE "header_rels" DROP COLUMN "resources_id";
  ALTER TABLE "footer_rels" DROP COLUMN "resources_id";
  ALTER TABLE "contact_info_rels" DROP COLUMN "resources_id";
  DROP TYPE "public"."enum_pages_blocks_faq_block_theme";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_theme";`)
}
