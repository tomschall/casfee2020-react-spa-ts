CREATE TABLE public.channel (
    id integer NOT NULL,
    name text NOT NULL,
    owner_id text,
    is_private boolean DEFAULT false NOT NULL,
    channel_type text NOT NULL
);
CREATE SEQUENCE public.channel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.channel_id_seq OWNED BY public.channel.id;
CREATE TABLE public.channel_poll (
    id integer NOT NULL,
    channel_id integer NOT NULL,
    poll_questions integer NOT NULL,
    is_active boolean DEFAULT false
);
CREATE SEQUENCE public.channel_poll_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.channel_poll_id_seq OWNED BY public.channel_poll.id;
CREATE TABLE public.channel_thread (
    id integer NOT NULL,
    message_id integer
);
CREATE SEQUENCE public.channel_thread_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.channel_thread_id_seq OWNED BY public.channel_thread.id;
CREATE TABLE public.channel_thread_message (
    id integer NOT NULL,
    user_id text NOT NULL,
    channel_thread_id integer NOT NULL,
    message text NOT NULL
);
CREATE SEQUENCE public.channel_thread_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.channel_thread_message_id_seq OWNED BY public.channel_thread_message.id;
CREATE TABLE public.channel_type (
    value text NOT NULL,
    comment text
);
CREATE TABLE public.message (
    id integer NOT NULL,
    text text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    user_id text NOT NULL,
    channel_id integer NOT NULL
);
CREATE TABLE public.message_cursor (
    id integer NOT NULL,
    channel_id integer NOT NULL,
    user_id text NOT NULL,
    message_id integer NOT NULL
);
CREATE SEQUENCE public.message_cursor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.message_cursor_id_seq OWNED BY public.message_cursor.id;
CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
CREATE TABLE public.poll_anwers (
    id integer NOT NULL,
    text text NOT NULL,
    votes integer DEFAULT 0 NOT NULL,
    question_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id text NOT NULL
);
CREATE SEQUENCE public.poll_anwers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.poll_anwers_id_seq OWNED BY public.poll_anwers.id;
CREATE TABLE public.poll_questions (
    id integer NOT NULL,
    text text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    owner_id text NOT NULL,
    is_active boolean NOT NULL
);
CREATE SEQUENCE public.poll_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.poll_questions_id_seq OWNED BY public.poll_questions.id;
CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    last_typed timestamp with time zone,
    last_seen timestamp with time zone,
    auth0_user_id text,
    last_typed_channel integer
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
    "user".last_seen,
    "user".auth0_user_id
   FROM public."user"
  WHERE ("user".last_seen > (now() - '00:00:10'::interval));
CREATE VIEW public.user_typing AS
 SELECT "user".id,
    "user".username,
    "user".last_typed,
    "user".last_seen,
    "user".auth0_user_id,
    "user".last_typed_channel
   FROM public."user"
  WHERE ("user".last_typed > (now() - '00:00:02'::interval));
ALTER TABLE ONLY public.channel ALTER COLUMN id SET DEFAULT nextval('public.channel_id_seq'::regclass);
ALTER TABLE ONLY public.channel_poll ALTER COLUMN id SET DEFAULT nextval('public.channel_poll_id_seq'::regclass);
ALTER TABLE ONLY public.channel_thread ALTER COLUMN id SET DEFAULT nextval('public.channel_thread_id_seq'::regclass);
ALTER TABLE ONLY public.channel_thread_message ALTER COLUMN id SET DEFAULT nextval('public.channel_thread_message_id_seq'::regclass);
ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
ALTER TABLE ONLY public.message_cursor ALTER COLUMN id SET DEFAULT nextval('public.message_cursor_id_seq'::regclass);
ALTER TABLE ONLY public.poll_anwers ALTER COLUMN id SET DEFAULT nextval('public.poll_anwers_id_seq'::regclass);
ALTER TABLE ONLY public.poll_questions ALTER COLUMN id SET DEFAULT nextval('public.poll_questions_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_name_key UNIQUE (name);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel_poll
    ADD CONSTRAINT channel_poll_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel_thread_message
    ADD CONSTRAINT channel_thread_message_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel_thread
    ADD CONSTRAINT channel_thread_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel_type
    ADD CONSTRAINT channel_type_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.message_cursor
    ADD CONSTRAINT message_cursor_channel_id_user_id_key UNIQUE (channel_id, user_id);
ALTER TABLE ONLY public.message_cursor
    ADD CONSTRAINT message_cursor_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.poll_anwers
    ADD CONSTRAINT poll_anwers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.poll_questions
    ADD CONSTRAINT poll_questions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_auth0_user_id_key UNIQUE (auth0_user_id);
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_pkey PRIMARY KEY (user_id, channel_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_channel_type_fkey FOREIGN KEY (channel_type) REFERENCES public.channel_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel_poll
    ADD CONSTRAINT channel_poll_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channel(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel_poll
    ADD CONSTRAINT channel_poll_poll_questions_fkey FOREIGN KEY (poll_questions) REFERENCES public.poll_questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel_thread_message
    ADD CONSTRAINT channel_thread_message_channel_thread_id_fkey FOREIGN KEY (channel_thread_id) REFERENCES public.channel_thread(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel_thread
    ADD CONSTRAINT channel_thread_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.message(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.channel_thread_message
    ADD CONSTRAINT channel_thread_message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT "message_channelId_fkey" FOREIGN KEY (channel_id) REFERENCES public.channel(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.poll_anwers
    ADD CONSTRAINT poll_anwers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.poll_questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channel(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_channels
    ADD CONSTRAINT user_channels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(auth0_user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
