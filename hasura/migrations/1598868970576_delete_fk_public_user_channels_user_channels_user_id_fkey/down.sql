alter table "public"."user_channels" add foreign key ("user_id") references "public"."user"("id") on update restrict on delete restrict;
