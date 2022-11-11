describe("Register Page", () => {
  beforeEach(() => {
    cy.task("cleanDB");
  });

  it("should register", () => {
    cy.visit("/register");

    cy.getByDataTest("username-input")
      .type("jhon")
      .should("have.value", "jhon");

    cy.getByDataTest("password-input")
      .type("pass")
      .should("have.value", "pass");

    cy.getByDataTest("submit").click();

    cy.url().should("include", "/login");
    cy.contains("You have been registered successfully.").should("be.visible");
  });

  it("should display an error when the username already exists", () => {
    cy.register("jhon", "1234");

    cy.visit("/register");

    cy.getByDataTest("username-input")
      .type("jhon")
      .should("have.value", "jhon");

    cy.getByDataTest("password-input")
      .type("pass")
      .should("have.value", "pass");

    cy.getByDataTest("submit").click();

    cy.contains("The username already exists").should("be.visible");
  });
});
