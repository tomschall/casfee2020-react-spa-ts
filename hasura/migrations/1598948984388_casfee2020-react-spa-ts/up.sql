CREATE TABLE public.channel (
    id integer NOT NULL,
    name text NOT NULL,
    owner_id text
);
CREATE SEQUENCE public.channel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.channel_id_seq OWNED BY public.channel.id;
CREATE TABLE public.message (
    id integer NOT NULL,
    text text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    user_id text NOT NULL,
    channel_id integer NOT NULL
);
CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    last_typed timestamp with time zone,
    last_seen timestamp with time zone,
    auth0_user_id text
);
COMMENT ON TABLE public."user" IS 'This table stores user data';
CREATE TABLE public.user_channels (
    user_id text NOT NULL,
    channel_id integer NOT NULL
);
CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
CREATE VIEW public.user_online AS
 SELECT "user".id,
    "user".username,
    "user".last_typed,
    "user".last_seen
   FROM public."user"
  WHERE ("user".last_seen > (now() - '00:00:10'::interval));
CREATE VIEW public.user_typing AS
 SELECT "user".id,
    "user".username,
    "user".last_typed,
    "user".last_seen
   FROM public."user"
  WHERE ("user".last_typed > (now() - '00:00:02'::interval));
ALTER TABLE ONLY public.channel ALTER COLUMN id SET DEFAULT nextval('public.channel_id_seq'::regclass);
ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_name_key UNIQUE (name);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_auth0_user_id_key UNIQUE (auth0_user_id);
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_pkey PRIMARY KEY (user_id, channel_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT "message_channelId_fkey" FOREIGN KEY (channel_id) REFERENCES public.channel(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channel(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
