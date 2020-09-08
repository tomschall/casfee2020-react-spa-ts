# Realtime Chat using GraphQL Subscriptions

This project is a realtime chat app that uses subscriptions in Hasura GraphQL Engine. It is built using React, Apollo and Hasura with Postgres DB.

Use Node Version 14.5

Project Setup (for Roli): If your docker containers are running, and you have to reinstall the whole project, stop them, the execute ./clean.sh script in the root folder of the project.

insert key for auth0 into docker-compose.yml - HASURA_GRAPHQL_JWT_SECRET

check config for auth0 in .env

Run docker containers

```
docker-compose up -d
```

Run yarn

```
yarn
```

Then start frontend

```
yarn start
```

Install Hasura cli if not installed

```
npm install --global hasura-cli
```

Then run migration

```
hasura migrate apply --endpoint <server-endpoint> --admin-secret supersecret
hasura metadata apply --endpoint <server-endpoint> --admin-secret supersecret
```

after that add a user to the database and then add one channel

- [Fully working app](http://localhost:3000)
- [Backend](http://localhost:8080/console)

If you want to add tables or metadata, please use hasura console:

```
hasura console
```

If you want to export migrations and metadata

```
hasura init
cd hasura
hasura migrate create casfee2020-react-spa-ts --from-server --endpoint http://localhost:8080 --admin-secret supersecret
hasura metadata export --endpoint http://localhost:8080 --admin-secret supersecret
```
