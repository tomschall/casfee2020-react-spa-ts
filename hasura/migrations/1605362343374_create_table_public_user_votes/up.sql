CREATE TABLE "public"."user_votes"("id" serial NOT NULL, "username" text NOT NULL, "auth0_user_id" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
