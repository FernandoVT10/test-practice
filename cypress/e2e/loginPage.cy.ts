describe("Login page", () => {
  const username = "jhon";
  const password = "pass";

  beforeEach(() => {
    cy.task("cleanDB");
    cy.register(username, password);
  });

  it("should login", () => {
    cy.visit("/login");

    cy.getByDataTest("username-input")
      .type(username)
      .should("have.value", username);
    cy.getByDataTest("password-input")
      .type(password)
      .should("have.value", password);

    cy.intercept("POST", "/api/user/login").as("loginRoute");

    cy.getByDataTest("submit").click();

    cy.wait("@loginRoute");

    cy.url().should("include", "/");
    cy.getCookie("authToken").should("not.be.null");
  });

  it("should display an error when either password or username or both are incorrect", () => {
    cy.visit("/login");

    cy.getByDataTest("username-input").type("username");
    cy.getByDataTest("password-input").type("1234");
    cy.getByDataTest("submit").click();

    cy.contains("Username or password are invalid").should("be.visible");
  });

  it("should redirect you to the home page when you're logged in", () => {
    cy.login();

    cy.visit("/login");

    cy.url().should("not.include", "/login");
  });
});
