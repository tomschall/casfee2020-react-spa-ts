ALTER TABLE "public"."channel" ADD COLUMN "is_private" bool;
ALTER TABLE "public"."channel" ALTER COLUMN "is_private" DROP NOT NULL;
