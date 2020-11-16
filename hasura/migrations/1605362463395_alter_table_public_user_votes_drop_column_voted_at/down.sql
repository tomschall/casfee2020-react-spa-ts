ALTER TABLE "public"."user_votes" ADD COLUMN "voted_at" timestamptz;
ALTER TABLE "public"."user_votes" ALTER COLUMN "voted_at" DROP NOT NULL;
ALTER TABLE "public"."user_votes" ALTER COLUMN "voted_at" SET DEFAULT now();
