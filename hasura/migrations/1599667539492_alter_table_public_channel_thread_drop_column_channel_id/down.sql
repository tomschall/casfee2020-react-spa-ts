ALTER TABLE "public"."channel_thread" ADD COLUMN "channel_id" int4;
ALTER TABLE "public"."channel_thread" ALTER COLUMN "channel_id" DROP NOT NULL;
