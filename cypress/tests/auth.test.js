import { lorem } from 'faker';

describe('auth', () => {
  it('lets me sign up', () => {
    cy.visit('/')
      .getByText(/get started/i)
      .click();
  });
  it.skip('an auth error throws a toast notification', () => {
    cy.visit('/')
      .getByText(/get started/i)
      .click();
  });
  it.skip('logout', () => {
    cy.visit('/')
      .getByText(/get started/i)
      .click();
  });
});
