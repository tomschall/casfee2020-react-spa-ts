INSERT INTO public.channel_type VALUES ('CHAT_MESSAGE', 'This represents a chat message'),('DIRECT_MESSAGE', 'This represents a direct message');
INSERT INTO public.user VALUES (DEFAULT, 'admin', NULL, NULL, 'admin', NULL);
INSERT INTO public.channel (name, owner_id, is_private, channel_type) VALUES ('general', 'admin', FALSE, 'CHAT_MESSAGE');
