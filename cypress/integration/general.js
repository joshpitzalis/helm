import user1 from '../fixtures/testUsers';
import user2 from '../fixtures/testUser2';

describe('Homepage', () => {
  it('should have to correct title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Pal Poll');
  });
});

describe('Time to completion shows on Homepage', () => {
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
  it('creates a 24 hour poll', () => {
    cy.get("[data-test='create']").click();
    cy.url().should('contain', 'create');
    cy.get("[data-test='title']").type('test question');
    cy.get("[data-test='context']").type('some context');
    cy.get("[data-test='single']").check();
    cy.get("[data-test='text']").check();
    cy.get('[data-test="public"]').check();
    cy
      .get('[data-test="slider"]')
      .invoke('val', 24)
      .trigger('change');
    cy.get("[data-test='submit']").click();
    cy.get("[data-test='question0']").type('option 1');
    cy.get("[data-test='add']").click();
    cy.get("[data-test='question1']").type('option 2');
    cy.get("[data-test='submit']").click();
    cy.get("[ data-test='done']").click();
    cy.url().should('contain', 'home');
  });

  it('checks for time left', () => {
    cy.visit('/home');
    cy.url().should('contain', 'home');
    cy.get("[data-test='deadline']").should('contain', 'Ends in 1 day');
  });

  it('deletes the poll', () => {
    cy.visit('/home');
    cy.url().should('contain', 'home');
    cy.wait(10000);
    cy
      .get("[data-test='response0']")
      .parent()
      .click({ force: true });
    cy.get("[data-test='delete']").click();
    cy.get("[data-test='delete']").click();
    cy.url().should('contain', 'home');
    cy.wait(10000);
    cy.contains('No Polls available.');
  });
  it('creates a 24 hour poll', () => {
    cy.get("[data-test='create']").click();
    cy.url().should('contain', 'create');
    cy.get("[data-test='title']").type('test question');
    cy.get("[data-test='context']").type('some context');
    cy.get("[data-test='single']").check();
    cy.get("[data-test='text']").check();
    cy.get('[data-test="public"]').check();
    cy
      .get('[data-test="slider"]')
      .invoke('val', 48)
      .trigger('change');
    cy.get("[data-test='submit']").click();
    cy.get("[data-test='question0']").type('option 1');
    cy.get("[data-test='add']").click();
    cy.get("[data-test='question1']").type('option 2');
    cy.get("[data-test='submit']").click();
    cy.get("[ data-test='done']").click();
    cy.url().should('contain', 'home');
  });

  it('checks for time left', () => {
    cy.visit('/home');
    cy.url().should('contain', 'home');
    cy.get("[data-test='deadline']").should('contain', 'Ends in 2 days');
  });

  it('deletes the poll', () => {
    cy.visit('/home');
    cy.url().should('contain', 'home');
    cy.wait(10000);
    cy
      .get("[data-test='response0']")
      .parent()
      .click({ force: true });
    cy.get("[data-test='delete']").click();
    cy.get("[data-test='delete']").click();
    cy.url().should('contain', 'home');
    cy.wait(10000);
    cy.contains('No Polls available.');
  });
});
