import { faker } from "@faker-js/faker";

declare global {
// eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      register(username: string, password: string): Chainable<void>,
      login(username?: string, password?: string): Chainable<void>,
      getByDataTest(dataTest: string): Chainable<JQuery<Element>>,
    }
  }
}

Cypress.Commands.add("register", (username, password) => {
  cy.request("POST", "/api/user/register", { username, password });
});

Cypress.Commands.add("login", (username, password) => {
  username = username || faker.internet.userName();
  password = password || faker.internet.password();

  cy.register(username, password);

  cy.request("POST", "/api/user/login", { username, password });
});


Cypress.Commands.add("getByDataTest", (dataTest) => {
  return cy.get(`[data-test="${dataTest}"]`);
});

export {};
