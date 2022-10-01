describe("setting up cypress", () => {
  it("should pass", () => {
    cy.visit("/");
    cy.contains("Go to Youtube").should("exist");
    cy.contains("pages/index.tsx").should("exist");
  });
});
