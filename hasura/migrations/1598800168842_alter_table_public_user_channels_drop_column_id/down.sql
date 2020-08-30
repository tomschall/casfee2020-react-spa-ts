ALTER TABLE "public"."user_channels" ADD COLUMN "id" int4;
ALTER TABLE "public"."user_channels" ALTER COLUMN "id" DROP NOT NULL;
ALTER TABLE "public"."user_channels" ALTER COLUMN "id" SET DEFAULT nextval('user_channels_id_seq'::regclass);
