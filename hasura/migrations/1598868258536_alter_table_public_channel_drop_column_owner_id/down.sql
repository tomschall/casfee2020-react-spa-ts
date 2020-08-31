ALTER TABLE "public"."channel" ADD COLUMN "owner_id" int4;
ALTER TABLE "public"."channel" ALTER COLUMN "owner_id" DROP NOT NULL;
ALTER TABLE "public"."channel" ADD CONSTRAINT channel_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES "public"."user" (id) ON DELETE restrict ON UPDATE restrict;
