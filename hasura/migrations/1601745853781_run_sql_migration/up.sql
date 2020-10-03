CREATE OR REPLACE VIEW "public"."user_typing" AS 
 SELECT "user".id,
    "user".username,
    "user".last_typed,
    "user".last_seen,
    "user".auth0_user_id
   FROM "user"
  WHERE ("user".last_typed > (now() - '00:00:02'::interval));
