alter table "public"."user_channels"
           add constraint "user_channels_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("auth0_user_id") on update restrict on delete restrict;
