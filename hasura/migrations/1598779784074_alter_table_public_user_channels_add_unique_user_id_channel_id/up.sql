alter table "public"."user_channels" add constraint "user_channels_user_id_channel_id_key" unique ("user_id", "channel_id");
