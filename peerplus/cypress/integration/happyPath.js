import user1 from "../fixtures/testUsers";

describe("Single choice text poll", () => {
  beforeEach("login", () => {
    cy.visit("/home", {
      onBeforeLoad: win => {
        win.localStorage.setItem(user1.key, user1.token);
      }
    });
    cy.on("uncaught:exception", (err, runnable) => {
      console.error(err);
      return false;
    });
  });
  it("creates the poll", () => {
    cy.get(`[data-test='create']`).click();
    cy.url().should("contain", "create");
    cy.get(`[data-test='title']`).type("test question");
    cy.get(`[data-test='context']`).type("some context");
    cy.get(`[data-test='single']`).check();
    cy.get(`[data-test='text']`).check();
    cy.get(`[data-test="public"]`).check();
    cy.get(`[data-test='submit']`).click();
    cy.get(`[data-test='question0']`).type("option 1");
    cy.get(`[data-test='add']`).click();
    cy.get(`[data-test='question1']`).type("option 2");
    cy.get(`[data-test='submit']`).click();
    cy
      .get('[data-test="newPollId"]')
      .invoke("text")
      .as("pollId");
    cy.get(`[data-test='congratulations']`).click();
    cy.url().should("contain", "poll");
  });

  // go to poll url and mark it complete
  it("completes the poll", function() {
    cy.visit(`/poll/${this.pollId}`);
    cy.get(`[data-test='response0']`).check();
    cy.get(`[data-test='submit']`).click();
    cy.url().should("contain", "done");
    cy.contains("Thank you for completing the poll.");
  });

  it("checks the response", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);
    cy.url().should("contain", "response");
    cy.get(`[data-test='count0']`).contains(1);
  });

  it("deletes the poll", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);

    cy.get(`[data-test='delete']`).click();
    cy.url().should("contain", "home");
    cy.contains("No Polls available.");
  });
});

describe("Multiple choice text poll", () => {
  beforeEach("login", () => {
    cy.visit("/home", {
      onBeforeLoad: win => {
        win.localStorage.setItem(user1.key, user1.token);
      }
    });
    cy.on("uncaught:exception", (err, runnable) => {
      console.error(err);
      return false;
    });
  });

  it("creates the poll", () => {
    cy.get(`[data-test='create']`).click();
    cy.url().should("contain", "create");
    cy.get(`[data-test='title']`).type("test question");
    cy.get(`[data-test='context']`).type("some context");
    cy.get(`[data-test='multi']`).check();
    cy.get(`[data-test='text']`).check();
    cy.get(`[data-test='submit']`).click();
    cy.get(`[data-test='question0']`).type("option 1");
    cy.get(`[data-test='add']`).click();
    cy.get(`[data-test='question1']`).type("option 2");
    cy.get(`[data-test='submitPoll']`).click();
    cy.wait(5000);
    cy.get(`[data-test='poll']`).click();
    cy.url().should("contain", "poll");
  });

  it("completes the poll", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='poll0']`).click();
    cy.url().should("contain", "poll");
    cy.contains("option 1");
    cy.get(`[data-test='response0']`).check();
    cy.get(`[data-test='response1']`).check();
    cy.get(`[data-test='submit']`).click();
    cy.wait(5000);
    cy.url().should("contain", "done");
    cy.contains("Done!");
  });

  it("checks the response", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);
    cy.url().should("contain", "response");
    cy.get(`[data-test='count0']`).contains(1);
    cy.get(`[data-test='count1']`).contains(1);
  });

  it("deletes the poll", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);

    cy.get(`[data-test='delete']`).click();
    cy.url().should("contain", "home");
    cy.contains("No Polls available.");
  });
});

describe.skip("Single choice image poll", () => {
  beforeEach("login", () => {
    cy.visit("/home", {
      onBeforeLoad: win => {
        win.localStorage.setItem(user1.key, user1.token);
      }
    });
    cy.on("uncaught:exception", (err, runnable) => {
      console.error(err);
      return false;
    });
  });
  it("creates the poll", () => {
    cy.get(`[data-test='create']`).click();
    cy.url().should("contain", "create");
    cy.get(`[data-test='title']`).type("test question");
    cy.get(`[data-test='context']`).type("some context");
    cy.get(`[data-test='single']`).check();
    cy.get(`[data-test='image']`).check();
    cy.get(`[data-test='submit']`).click();

    // const dropEvent = {
    //   dataTransfer: {
    //     files: []
    //   }
    // }

    cy.fixture("duck").then(picture => {
      return Cypress.Blob.base64StringToBlob(picture, "image/jpeg").then(
        blob => cy.get(`[data-test='dropzone']`).trigger("drop", [blob])
        // {
        //   dropEvent.dataTransfer.files.push(blob)
        // }
      );
    });
    // cy.wait(5000)
    // console.log('dropEvent', dropEvent)
    // cy.get(`[data-test='dropzone']`).trigger('drop', dropEvent)

    cy.wait(5000);
    // cy.get(`[data-test='add']`).click()
    // cy.get(`[data-test='question1']`).type('option 2')

    cy.get(`[data-test='submitPoll']`).click();
    cy.wait(5000);
    cy.get(`[data-test='poll']`).click();
    cy.url().should("contain", "poll");
  });

  it("completes the poll", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='poll0']`).click();
    cy.url().should("contain", "poll");
    cy.contains("option 1");
    cy.get(`[data-test='response0']`).check();
    cy.get(`[data-test='submit']`).click();
    cy.wait(5000);
    cy.url().should("contain", "done");
    cy.contains("Done!");
  });

  it("checks the response", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);
    cy.url().should("contain", "response");
    cy.get(`[data-test='count0']`).contains(1);
  });

  it("deletes the poll", () => {
    cy.url().should("contain", "home");
    cy.get(`[data-test='response0']`).click();
    cy.wait(5000);

    cy.get(`[data-test='delete']`).click();
    cy.url().should("contain", "home");
    cy.contains("No Polls available.");
  });
});
