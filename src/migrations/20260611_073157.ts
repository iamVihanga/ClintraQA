import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_service_grid" ADD COLUMN "is_selectable" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_service_grid" ADD COLUMN "is_selectable" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_service_grid" DROP COLUMN "request_url";
  ALTER TABLE "_pages_v_blocks_service_grid" DROP COLUMN "request_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_service_grid" ADD COLUMN "request_url" varchar DEFAULT '/request-support';
  ALTER TABLE "_pages_v_blocks_service_grid" ADD COLUMN "request_url" varchar DEFAULT '/request-support';
  ALTER TABLE "pages_blocks_service_grid" DROP COLUMN "is_selectable";
  ALTER TABLE "_pages_v_blocks_service_grid" DROP COLUMN "is_selectable";`)
}
