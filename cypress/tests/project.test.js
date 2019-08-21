import { lorem } from 'faker';




describe('projects', () => {


  it('create, edit and delete a project', () => {
    const fakeProjectName = lorem.words();
 

    cy.visit('/')
      .getByTestId('authPage')
      .getByText(/signup or login/i)
      .login()

      .getByTestId('dashboardPage')
      .wait(3000)
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

});

// it.skip('update image when you login', () => {})

// make sure yu dont delete people when adding new people to an existing project

//   simulate an error creating/editing or deleting