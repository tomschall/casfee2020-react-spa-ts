alter table "public"."channel_poll"
           add constraint "channel_poll_poll_questions_fkey"
           foreign key ("poll_questions")
           references "public"."poll_questions"
           ("id") on update restrict on delete restrict;
