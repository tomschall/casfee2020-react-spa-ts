CREATE TABLE "public"."poll_questions"("id" serial NOT NULL, "text" text NOT NULL, "created_at" timestamptz NOT NULL, "updated_at" timestamptz NOT NULL, "owner_id" text NOT NULL, "is_active" boolean NOT NULL, PRIMARY KEY ("id") );