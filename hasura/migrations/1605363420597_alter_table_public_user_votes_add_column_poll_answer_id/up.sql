ALTER TABLE "public"."user_votes" ADD COLUMN "poll_answer_id" integer NOT NULL UNIQUE DEFAULT null;
