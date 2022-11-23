import { faker } from "@faker-js/faker";

// problems when selecting the dropdown button with cy.get
// because its automatic scroll
describe("Home page", { scrollBehavior: false }, () => {
  const createNote = (
    title = faker.lorem.words(3),
    content = faker.lorem.paragraph(3)
  ) => {
    cy.request("POST", "/api/notes/", { title, content });
  };

  beforeEach(() => {
    cy.task("cleanDB");
    cy.login();
  });

  it("should redirect to the login page when you aren't authenticated", () => {
    cy.clearCookies();
    cy.visit("/");
    cy.url().should("include", "login");
  });

  it("should display a message when there are no notes", () => {
    cy.visit("/");
    cy.contains("You have no notes").should("be.visible");
  });

  describe("When creating a note", () => {
    const title = faker.lorem.words(3);
    const content = faker.lorem.paragraphs(3);

    beforeEach(() => {
      cy.visit("/");
      cy.getByDataTest("add-note-button").click();

      cy.getByDataTest("create-note-title-input").type(title);
      cy.getByDataTest("create-note-content-textarea")
        .type(content, { delay: 0 });
    });

    it("should create a note", () => {
      cy.getByDataTest("create-note-submit").click();

      cy.contains(title).should("be.visible");
    });

    it("should display an error", () => {
      cy.intercept("POST", "/api/notes", {
        statusCode: 500
      });

      cy.getByDataTest("create-note-submit").click();
      cy.contains("There was an error trying to create your note").should("be.visible");
    });
  });

  it("should delete a note", () => {
    const title = faker.lorem.words(3);

    createNote(title);

    cy.visit("/");

    cy.getByDataTest("note-dropdown-button").click();

    cy.getByDataTest("note-dropdown-option").contains("Delete Note").click();
    cy.contains("Yes, I'm sure").click();

    cy.contains(title).should("not.exist");
    cy.contains("You have no notes").should("be.visible");
  });

  describe("when updating a note", () => {
    const newTitle = faker.lorem.words(3);

    beforeEach(() => {
      createNote();
      cy.visit("/");

      cy.getByDataTest("note-dropdown-button").click();
      cy.getByDataTest("note-dropdown-option").contains("Edit Note").click();

      cy.getByDataTest("update-note-title-input").clear().type(newTitle);
    });

    it("should update a note", () => {
      cy.intercept("GET", "/").as("fetchNotes");
      cy.getByDataTest("update-note-submit").click();
      cy.wait("@fetchNotes");

      cy.contains(newTitle).should("be.visible");
    });

    it("should display an error", () => {
      cy.intercept("PUT", "/api/notes/*", {
        statusCode: 500
      });

      cy.getByDataTest("update-note-submit").click();

      cy.contains("There was an error trying to update your note").should("be.visible");
    });
  });
});
