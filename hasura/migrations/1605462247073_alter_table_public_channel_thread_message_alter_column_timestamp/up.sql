ALTER TABLE "public"."channel_thread_message" ALTER COLUMN "timestamp" TYPE timestamp with time zone;
ALTER TABLE "public"."channel_thread_message" ALTER COLUMN "timestamp" SET NOT NULL;
