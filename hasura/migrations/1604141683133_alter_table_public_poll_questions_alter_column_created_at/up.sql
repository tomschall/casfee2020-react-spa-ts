ALTER TABLE ONLY "public"."poll_questions" ALTER COLUMN "created_at" SET DEFAULT now();
ALTER TABLE "public"."poll_questions" ALTER COLUMN "created_at" DROP NOT NULL;
