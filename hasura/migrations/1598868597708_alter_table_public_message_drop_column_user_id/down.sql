ALTER TABLE "public"."message" ADD COLUMN "user_id" int4;
ALTER TABLE "public"."message" ALTER COLUMN "user_id" DROP NOT NULL;
ALTER TABLE "public"."message" ADD CONSTRAINT message_user_fkey FOREIGN KEY (user_id) REFERENCES "public"."user" (id) ON DELETE restrict ON UPDATE restrict;
