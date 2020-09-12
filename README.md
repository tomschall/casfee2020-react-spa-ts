# Realtime Chat using GraphQL Subscriptions

This project is a realtime chat app that uses subscriptions in Hasura GraphQL Engine. 
It is built using React, Apollo and Hasura with Postgres DB.

## Prerequisites
* Node (See `.nvmrc` for exact version or use `nvm use`)
* yarn
* Auth0 account, project and key (See: documentation/auth0.md)
* Docker & docker-compose
* [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html)

## Usage
### Configuration
1. Copy `.env.dist` to `.env` and set all variables for your development environment.

### Installation
```shell script
# Install all dependencies
yarn install
```

### Usage
```shell script
# Start API inside Docker
docker-compose up -d 
# apply latest migrations and finally start app.
yarn dev:start
```

#### Development
##### Start Hasura Console
```shell script
npm run api:hasura:console
```

##### Generate TS types and React hooks
```shell script
npm run api:client:generate
```

## Troubleshooting
### Complete reinstall
* If your docker containers are running, and you have to reinstall the whole project, stop 
  them, the execute ./clean.sh script in the root folder of the project.









## TODO:

after that add a user to the database and then add one channel

- [Frontend](http://localhost:3000)
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


