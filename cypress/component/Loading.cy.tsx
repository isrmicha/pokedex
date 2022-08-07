import { Loading } from "../../src/components/Loading";

describe("Loading.cy.ts", () => {
  it("mounts", () => {
    cy.mount(<Loading />);
    cy.get('span[role="progressbar"]').should("exist");
  });
});
