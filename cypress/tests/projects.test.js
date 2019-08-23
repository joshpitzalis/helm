import { lorem, internet } from 'faker';

describe('projects', () => {
  const fakeProjectName = lorem.words();

  it('Create a primary project objective', () => {
    cy.visit('/')
      .getByTestId('dashboardPage')
      .wait(1000)
      .getByText(/create a new project/i)
      .click()
      .queryByTestId('addProjectModal')
      .getByPlaceholderText(/project name/i)
      .type(fakeProjectName)
      .getByText(/save/i)
      .click()
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      // create a new objective
      .getByText(/ADD A PRIMARY OBJECTIVE/i)
      .click()
      .getByTestId('objectiveModal');
      // add name, deadline, type, complete
  });

  it.skip(' edit, update, delete and complete project objectives', () => {
    cy.visit('/')
      .getByTestId('dashboardPage')
      .wait(1000)
      .getByText(/create a new project/i)
      .click()
      .queryByTestId('addProjectModal')
      .getByPlaceholderText(/project name/i)
      .type(fakeProjectName)
      .getByText(/save/i)
      .click()
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      // create a new objective
      .getByText(/ADD A PRIMARY OBJECTIVE/i)
      .click()
      .getByTestId('objectiveModal');
      // add name, deadline, type, complete
  });
});
