INSERT INTO public.channel_type VALUES ('CHAT_MESSAGE', 'This represents a chat message'),('DIRECT_MESSAGE', 'This represents a direct message');
INSERT INTO public.user VALUES (DEFAULT, 'admin', NULL, NULL, 'admin', NULL);
INSERT INTO public.user VALUES (DEFAULT, 'michael', NULL, NULL, 'auth0|5fc7640663436700752b1e58', NULL);
INSERT INTO public.user VALUES (DEFAULT, 'silvan1', NULL, NULL, 'auth0|5fc7647ce3b04b00769e807c', NULL);
INSERT INTO public.user VALUES (DEFAULT, 'kimi', NULL, NULL, 'auth0|5f5f7119b9bd4c006ae69306', NULL);
INSERT INTO public.user VALUES (DEFAULT, 'webrooster', NULL, NULL, 'auth0|5f50b4e80f72b40067b511c4', NULL);
INSERT INTO public.user VALUES (DEFAULT, 'thomas.schallert', NULL, NULL, 'auth0|5f4ec52d0877fd0067702e49', NULL);
INSERT INTO public.channel (name, owner_id, is_private, channel_type) VALUES ('general', 'admin', FALSE, 'CHAT_MESSAGE');
INSERT INTO public.message (text, user_id, channel_id) VALUES ('Welcome to channel general', 'admin', 1);
