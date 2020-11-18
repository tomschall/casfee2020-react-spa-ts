ALTER TABLE ONLY "public"."poll_questions" ALTER COLUMN "updated_at" DROP DEFAULT;
ALTER TABLE "public"."poll_questions" ALTER COLUMN "updated_at" SET NOT NULL;
