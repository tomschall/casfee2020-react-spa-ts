alter table "public"."channel" add foreign key ("owner_id") references "public"."user"("id") on update restrict on delete restrict;
