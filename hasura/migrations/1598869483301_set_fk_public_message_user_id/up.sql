alter table "public"."message"
           add constraint "message_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("auth0_user_id") on update restrict on delete restrict;
