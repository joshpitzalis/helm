import { lorem, internet } from 'faker';

describe('projects', () => {
  const fakeProjectName = lorem.words();

  it('Create, edit, update, delete and complete project objectives', () => {
    cy.visit('/');
  });
});
