describe("home page", () => {
  it("should render", () => {
    cy.server();

    cy
      .route({
        method: "GET",
        url: "/v2/organizations",
        status: 200,
        response: []
      })
      .as("getOrganizations");

    cy
      .route({
        method: "GET",
        url: "/v2/spaces",
        status: 200,
        response: []
      })
      .as("getSpaces");

    cy.login();

    cy.wait(["@getOrganizations", "@getSpaces"]);

    cy.title().should("include", "cloud.gov dashboard");
  });
});
