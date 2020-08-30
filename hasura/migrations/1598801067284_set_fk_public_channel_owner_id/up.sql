alter table "public"."channel"
           add constraint "channel_owner_id_fkey"
           foreign key ("owner_id")
           references "public"."user"
           ("id") on update restrict on delete restrict;
