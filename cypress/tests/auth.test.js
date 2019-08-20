// import { lorem } from 'faker';

describe('auth', () => {
  it('lets me sign up', () => {
    cy.visit('/')
      .getByTestId('authPage')
      .getByText(/signup or login/i)
      .login()
      .getByTestId('dashboardPage');
  });

  it('redirect you when logged in and lets you logout', () => {
    cy.visit('/')
      .getByTestId('dashboardPage')
      .logout()
      .getByTestId('authPage')
      .getByText(/signup or login/i);
  });

  it('protected pages are protected', () => {
    cy.visit('/dashboard/123')
      .getByTestId('authPage')
      .getByText(/signup or login/i);
  });

  it('non existant pages have a no-match page', () => {
    cy.visit('/dash/123').getByTestId('noMatchPage');
  });
});
