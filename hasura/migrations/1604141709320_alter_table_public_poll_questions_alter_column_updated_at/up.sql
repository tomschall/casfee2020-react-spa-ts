ALTER TABLE ONLY "public"."poll_questions" ALTER COLUMN "updated_at" SET DEFAULT now();
ALTER TABLE "public"."poll_questions" ALTER COLUMN "updated_at" DROP NOT NULL;
