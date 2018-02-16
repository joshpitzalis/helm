describe("Homepage", () => {
  it("should have to correct title", () => {
    cy.visit("/");
    cy.title().should("eq", "Pal Poll");
  });
});
