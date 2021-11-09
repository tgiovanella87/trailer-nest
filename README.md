# trailer-nest

## Description

This application runs as a service to returns trailer of movies receiving VIAPAY movie's url input.

#Prerequisites

* Node
* Nestjs
* Postman (optional)

## Installation

After clone the project, please run:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

In the ROOT directory of the project, there is a collection to import on POSTMAN to help the tests. The file is called "TMDB.postman_collection.json".

## To Go to Prod

* Maybe will be necessary to improve the unit tests to a better coverage before the go live;
* The cache TTL was hardcoded on the project to 30 minutes. It also could be set as a parameter;
* Only movies was tested.

## License

Nest is [MIT licensed](LICENSE).

