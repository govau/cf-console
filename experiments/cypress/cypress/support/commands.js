Cypress.Commands.add("login", () => {
  cy.server();

  cy
    .route({
      method: "GET",
      url: "/v2/authstatus",
      status: 200,
      response: {
        status: "authorized"
      }
    })
    .as("getAuthStatus");

  const userGuid = "6f34ba47-59d9-4ffb-aed0-df289bfb9544";

  cy
    .route({
      method: "GET",
      url: "/uaa/userinfo",
      status: 200,
      response: {
        user_id: userGuid,
        sub: userGuid,
        user_name: "me@example.com",
        given_name: "",
        family_name: "",
        email: "me@example.com",
        phone_number: null,
        previous_logon_time: 1507766681763,
        name: " "
      }
    })
    .as("getUAAUserInfo");

  cy
    .route({
      method: "GET",
      url: `/v2/users/${userGuid}`,
      status: 200,
      response: {}
    })
    .as("getUser");

  cy
    .route({
      method: "GET",
      url: `/uaa/uaainfo?uaa_guid=${userGuid}`,
      status: 200,
      response: {}
    })
    .as("getUAAInfo");

  cy.visit("/");

  cy.wait(["@getAuthStatus", "@getUAAUserInfo", "@getUAAInfo", "@getUser"]);
});
