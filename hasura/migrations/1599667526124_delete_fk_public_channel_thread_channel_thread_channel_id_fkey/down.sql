alter table "public"."channel_thread" add foreign key ("channel_id") references "public"."channel"("id") on update restrict on delete restrict;
