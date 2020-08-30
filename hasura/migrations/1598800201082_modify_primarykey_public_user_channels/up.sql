alter table "public"."user_channels"
    add constraint "user_channels_pkey" 
    primary key ( "user_id", "channel_id" );
