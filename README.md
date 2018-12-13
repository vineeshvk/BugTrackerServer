# BugTracker Server

It's is an Apollo Graphql Server created using typescript which uses postgres as it's database.
and is deployed in heroku at http://bugtracker-server.herokuapp.com using docker container.

## Android App

[Bug tracker Android App](https://github.com/ThalapathySiva/BugTracker) is an android app which uses this server as backend.

### Features

- create user(admin or normal)
- login
- create bug and assign
- view bugs
- change status of bugs

### Libraries used

- [Apollo-server](https://www.apollographql.com/docs/apollo-server/)
- [Typeorm](http://typeorm.io/#/)

### Requirements

- nodeJs
- postgres (with a database names BugTracker )

### How to run

#### Normal

you have to run your postgres server at PORT 5432 then

```
npm install
```

```
npm start
```

#### With Docker

first install [docker](https://docs.docker.com/install/#supported-platforms) and [docker-compose](https://docs.docker.com/compose/install/#install-compose)

```
docker-compose up
```

in the project directory.
then open **http://localhost:4000** in your web browser
