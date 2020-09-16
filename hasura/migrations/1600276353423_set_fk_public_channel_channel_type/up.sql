alter table "public"."channel"
           add constraint "channel_channel_type_fkey"
           foreign key ("channel_type")
           references "public"."channel_type"
           ("value") on update restrict on delete restrict;
