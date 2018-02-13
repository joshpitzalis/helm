import user1 from '../fixtures/testUsers';

describe('Finer details on completing a poll', () => {
  before('login', () => {
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

  it('creates a public poll', () => {
    cy.get("[data-test='create']").click();
    cy.url().should('contain', 'create');
    cy.get("[data-test='title']").type('test question');
    cy.get("[data-test='context']").type('some context');
    cy.get("[data-test='single']").check();
    cy.get("[data-test='text']").check();
    cy.get("[data-test='submit']").click();
    cy.get('[data-error]').contains('You must make your poll public or private.');
    cy.get("[data-test='public']").check();
    cy.get("[data-test='submit']").click();
    cy.contains('Options');
    cy.get("[data-test='submit']").click();
    cy.contains('Options');
    cy.get('[data-error]').contains('You need to add atleast two questions to proceed');
    cy.get("[data-test='question0']").type('test question');
    cy.get('[data-test="add"]').click();
    cy.get("[data-test='question1']").type('test question');
    cy.get("[data-test='submit']").click();
    cy
      .get('[data-test="newPollId"]')
      .invoke('text')
      .as('pollId');
    cy.get('[data-test="congratulations"]');
  });

  it('Cannot complete the new poll without a response ', function () {
    cy.visit(`/poll/${this.pollId}`);
    cy.get("[data-test='submit']").click();
    cy.get('[data-error]').contains('You must select atleast one option to proceed.');
    cy.get("[data-test='response0']").check();
    cy.get("[data-test='submit']").click();
    cy.url().should('contain', 'done');
    cy.contains('Thank you for completing the poll.');
    cy.get("[data-test='login']").contains('Sign Up With Facebook');
  });

  it('deletes the poll', () => {
    cy.visit('/home', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(user1.key, user1.token);
      },
    });
    cy.url().should('contain', 'home');
    cy.get("[data-test='response0']").click();
    cy.get("[data-test='delete']").click();
    cy.get("[data-test='delete']").click();
    cy.url().should('contain', 'home');
    cy.wait(10000);
    cy.contains('No Polls available.');
  });
});
