![Login Screen](/github/app.gif)

This is a super small project created to learn better practices when testing with cypress and testing in general. Now I've learned several things thanks to this project, but I know there are things that can be wrong or can be done better.

## Features
- This project was created with **NextJS 13** and **ExpressJS**, using **Jest** and **Cypress** for testing, **TypeScript**, **MongoDB** for the database, and **EsLint** for code formatting.
- It has a super simple system of users, you can register and login to access to the application.
- In the application you can create notes and update or delete them.

## How to run the app
- First you need to copy or rename `.env.example` to `.env` and fill `JWT_SECRET_KEY` and `MONGO_URI`.
- Then you can run `npm run build` to build the project for production.
- Now use `npm run start` to start the server and go to [http://localhost:3000](http//localhost:3000).
- Now you will be able to use the app correctly.

## How to run the tests
### Running Unit and Integration tests with Jest
You can use `npm run test` to run unit and integration tests using **Jest**.

### E2E tests using cypress.
Now to run the E2E tests you will need to copy or rename `.env.test.example` to `.env.test` and fill `JWT_SECRET_KEY` and `MONGO_URI`, you can use `npm run test:e2e` to run cypress.

## Developing E2E tests
If you go to the `package.json` you can see that when we use `npm run test:e2e`, we build the application before running `start-server-and-test`, now for developing it will be something annoying to build the application each time we need to change something, for that you can use `npm run dev:e2e` this command will run the server with nodemon and will run `cypress open`.
