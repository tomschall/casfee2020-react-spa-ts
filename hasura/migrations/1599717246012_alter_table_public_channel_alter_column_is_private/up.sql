ALTER TABLE ONLY "public"."channel" ALTER COLUMN "is_private" SET DEFAULT false;
ALTER TABLE "public"."channel" ALTER COLUMN "is_private" SET NOT NULL;
