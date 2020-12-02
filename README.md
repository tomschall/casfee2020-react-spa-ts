# Realtime Chat using GraphQL Subscriptions

This project is a realtime chat app that uses subscriptions in Hasura GraphQL Engine.
It is built using React, Apollo and Hasura with Postgres DB.

## Prerequisites

- Node (See `.nvmrc` for exact version or use `nvm use`)
- yarn
- Auth0 account, project and key (See: documentation/auth0.md)
- Docker & docker-compose
- [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html)

## Usage

### Configuration

1. Copy `.env.dist` to `.env` and set all variables for your development environment.

### Installation

```shell script
# Clone nestjs microservice for hasura actions
git clone https://github.com/tomschall/casfee2020-nestjs.git nestjs
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

#### Users for testing

- For login take the following users
  email: michael@michael.ch
  email: silvan1@silvan.ch
  email: kimi@gmail.com
  email: webrooster@webrooster.ch
  pw: admin1234.$

* [Frontend](http://localhost:3000)
* [Backend](http://localhost:8080/console)

#### Development

##### Start Hasura Console

- If you want to add tables or metadata, please use hasura console, changes will be tracked automatically:

```shell script
yarn api:hasura:console
```

#### Export metadata and migrations manually

- In the project root folder delete hasura folder, the run following commands

```shell script
hasura init
cd hasura
hasura migrate create casfee2020-react-spa-ts --from-server --endpoint http://localhost:8080 --admin-secret supersecret
hasura metadata export --endpoint http://localhost:8080 --admin-secret supersecret
```

##### Generate TS types and React hooks

```shell script
npm run api:client:generate
```

## Troubleshooting

### Complete reinstall

- If your docker containers are running, and you have to reinstall the whole project, stop
  them, the execute ./clean.sh script in the root folder of the project.

## Tests

### Tests with nightwatch

```
npx nightwatch nightwatch_tests
```
