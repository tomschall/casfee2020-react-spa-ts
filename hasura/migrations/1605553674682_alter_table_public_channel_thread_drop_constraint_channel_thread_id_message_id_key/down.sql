alter table "public"."channel_thread" add constraint "channel_thread_id_message_id_key" unique ("id", "message_id");
