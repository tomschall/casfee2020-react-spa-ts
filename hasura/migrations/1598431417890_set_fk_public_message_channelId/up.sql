alter table "public"."message"
           add constraint "message_channelId_fkey"
           foreign key ("channelId")
           references "public"."channel"
           ("id") on update restrict on delete restrict;
