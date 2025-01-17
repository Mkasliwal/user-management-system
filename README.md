<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <H2 align="center">✨ NestJs | A NodeJs Backend Framework</H2>
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Description

User Management System. Backend API based application.

## Project setup
> **TODO**: Containerization for application using Docker 🐳 and docker compose. 

```bash
$ npm install
```

## Compile and run the project

```bash
# development | watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables
> Create _.env.dev_ file and copy _.env.example_ file contents
```bash
# ./.env.dev


#app
HOST=0.0.0.0
PORT=3000

# DB
# Ensure to create `employees` database first in the database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root

# JWT
JWT_PRIVATE=undecipher_key#0987654
```

## API Usage
### GET - /app/hc
> Get Service Health Check

### POST - /auth/signup/
> Register the user
```JSON
// request payload
{
	"name": "string",
	"mobile": "string",
	"password": "string"
}
```

### POST - /auth/signin/
> Signin the user
```JSON
// request payload
{
	"mobile": "string",
	"password": "string"
}
```

### POST - /auth/signout/
> Signout the user


### GET - /auth/whoami/
> Get signed in user details

