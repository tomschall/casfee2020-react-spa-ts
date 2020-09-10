ALTER TABLE ONLY "public"."channel" ALTER COLUMN "is_private" DROP DEFAULT;
ALTER TABLE "public"."channel" ALTER COLUMN "is_private" DROP NOT NULL;
