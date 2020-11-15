ALTER TABLE "public"."channel_thread_message" ALTER COLUMN "timestamp" TYPE timestamp without time zone;
ALTER TABLE "public"."channel_thread_message" ALTER COLUMN "timestamp" DROP NOT NULL;
