alter table "public"."channel_thread"
           add constraint "channel_thread_message_id_fkey"
           foreign key ("message_id")
           references "public"."message"
           ("id") on update restrict on delete restrict;
