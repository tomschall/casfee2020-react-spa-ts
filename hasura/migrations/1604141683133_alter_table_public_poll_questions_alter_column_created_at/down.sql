ALTER TABLE ONLY "public"."poll_questions" ALTER COLUMN "created_at" DROP DEFAULT;
ALTER TABLE "public"."poll_questions" ALTER COLUMN "created_at" SET NOT NULL;
