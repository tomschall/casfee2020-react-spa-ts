alter table "public"."message" add foreign key ("user_id") references "public"."user"("id") on update restrict on delete restrict;
