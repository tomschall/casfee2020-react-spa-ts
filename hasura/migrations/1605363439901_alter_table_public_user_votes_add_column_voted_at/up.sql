ALTER TABLE "public"."user_votes" ADD COLUMN "voted_at" timestamptz NOT NULL DEFAULT now();
