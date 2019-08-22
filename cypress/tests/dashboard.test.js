import { lorem, internet } from 'faker';

describe('dashboard', () => {
  const fakeProjectName = lorem.words();

  it('create, edit and delete a project', () => {
    cy.visit('/')
      .getByTestId('authPage')
      .getByText(/signup or login/i)
      .login()
      .getByTestId('dashboardPage')
      .wait(1000)
      .getByText(/create a new project/i)
      .click()
      .queryByTestId('addProjectModal')
      .getByPlaceholderText(/project name/i)
      .type(fakeProjectName)
      .getByText(/save/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      //   edit
      .getByTestId(`${fakeProjectName}-edit`)
      .click()
      .getByTestId('projectNameInput')
      .type(555)
      .getByText(/save/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      //   delete
      .getByTestId(`${fakeProjectName}555-edit`)
      .click()
      .getByTestId('deleteProject')
      .click()
      .getByText(/confirm delete/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      .queryByText(`${fakeProjectName}555`)
      .should('not.exist');
  });

  it('add and remove people from projects', () => {
    const fakeEmail1 = internet.email();
    const fakeEmail2 = internet.email();
    cy.visit('/')
      .getByTestId('dashboardPage')
      .wait(1000)
      .getByText(/create a new project/i)
      .click()
      .queryByTestId('addProjectModal')
      .getByPlaceholderText(/project name/i)
      .type(fakeProjectName)
      .getByPlaceholderText(/add email address/i)
      .type(fakeEmail1)
      .getByText(/add person/i)
      .click()
      .getByText(fakeEmail1)
      .getByText(/save/i)
      .click()
      .getByTestId(`${fakeProjectName}-edit`)
      .click()
      .getByPlaceholderText(/add email address/i)
      .type(fakeEmail2)
      .getByText(/add person/i)
      .click()
      .getByText(/save/i)
      .getByTestId(`${fakeProjectName}-edit`)
      .click()
      .getByText(fakeEmail1)
      .getByText(fakeEmail2);
  });
});

// it.skip('update image when you login', () => {})

// make sure yu dont delete people when adding new people to an existing project

//   simulate an error creating/editing or deleting
