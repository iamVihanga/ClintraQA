import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_service_grid" ADD COLUMN "show_filter_options" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_service_grid" ADD COLUMN "show_filter_options" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_service_grid" DROP COLUMN "show_filter_options";
  ALTER TABLE "_pages_v_blocks_service_grid" DROP COLUMN "show_filter_options";`)
}
