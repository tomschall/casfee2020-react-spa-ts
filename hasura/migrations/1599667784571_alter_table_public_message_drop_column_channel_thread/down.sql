ALTER TABLE "public"."message" ADD COLUMN "channel_thread" int4;
ALTER TABLE "public"."message" ALTER COLUMN "channel_thread" DROP NOT NULL;
