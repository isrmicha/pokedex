describe("pokemon table", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays loading when init", () => {
    cy.get('span[role="progressbar"]').should("exist");
  });

  it("displays table when get payload from pokeapi", () => {
    cy.get("table").should("exist");
  });
  it("should have 20 pokemons on table", () => {
    cy.get("table tr").should("have.length", 21);
  });
  it("displays table header", () => {
    cy.contains("ID").should("exist");
    cy.contains("Name").should("exist");
    cy.contains("Sprite").should("exist");
    cy.contains("Types").should("exist");
  });
  it("displays bulbassaur on the table", () => {
    cy.contains("#1").should("exist");
  });
  it("displays bulbassaur on the table", () => {
    cy.contains("bulbasaur").should("exist");
  });
  it("displays ivysaur on the table", () => {
    cy.contains("ivysaur").should("exist");
  });
  it("displays venusaur on the table", () => {
    cy.contains("venusaur").should("exist");
  });
  it("displays bulbasaur type", () => {
    cy.contains("grass").should("exist");
    cy.contains("poison").should("exist");
  });
  it("displays 40 pokemons when infiniteScroll", () => {
    cy.get("div[cy-id='pokeTable").scrollTo("bottom");
    cy.get("table tr").should("have.length", 41);
  });
  it("displays 60 pokemons when infiniteScroll", () => {
    cy.get("div[cy-id='pokeTable").scrollTo("bottom");
    cy.get("table tr").should("have.length", 61);
  });
});
