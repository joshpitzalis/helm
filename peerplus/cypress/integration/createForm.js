import user1 from '../fixtures/testUsers';

describe('requires all fields to proceed from step 1', () => {
  beforeEach('login', () => {
    cy.visit('/home', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(user1.key, user1.token);
      },
    });
    cy.on('uncaught:exception', (err, runnable) => {
      console.error(err);
      return false;
    });
  });

  it.only('creates the private poll', () => {
    cy.get("[data-test='create']").click();
    cy.url().should('contain', 'create');
    cy.get("[data-test='title']").type('test question');
    cy.get("[data-test='context']").type('some context');
    cy.get("[data-test='single']").check();
    cy.get("[data-test='text']").check();
    cy.get("[data-test='submit']").click();
    cy.get('[data-error]').contains('You must make your poll public or private.');
    cy.get("[data-test='private']").check();
    cy.get("[data-test='submit']").click();
    cy.contains('Questions');
    cy.get("[data-test='submit']").click();
    cy.contains('Questions');
    cy.get('[data-error]').contains('You need to add atleast two questions to proceed');
    cy.get("[data-test='question0']").type('test question');
    cy.get('[data-test="add"]').click();
    cy.get("[data-test='question1']").type('test question');
    cy.get("[data-test='submit']").click();
    cy.contains('Send to');
    cy
      .get('[data-addFriend]')
      .first()
      .click();
    cy.get("[data-test='submit']").click();
    cy.get('[congratulations]');
    // select a friend
    // send
    // make sure friend recieved
    // make sure non friend didnt

    // cy.get(`[data-test='question0']`).type('option 1');
    // cy.get(`[data-test='add']`).click();
    // cy.get(`[data-test='question1']`).type('option 2');
    // cy.get(`[data-test='submitPoll']`).click();
    // cy.wait(5000);
    // cy.get(`[data-test='poll']`).click();
    // cy.url().should('contain', 'poll');
  });
});

// test that loading appears before friends content arrives
// test that add person works
// test that remove eprson works
// test that resync works