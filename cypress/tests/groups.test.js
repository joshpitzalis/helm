import { lorem, random } from 'faker';
import { AutoComplete, Icon } from 'antd';

describe('metric objectives', () => {
  const fakeProjectName = lorem.words();
  const fakeObjectiveName = lorem.words();
  const fakeObjectiveName2 = lorem.words();
  const fakeObjectiveName3 = lorem.words();
  const fakeObjectiveDescription = lorem.sentence();

  it.only('lets me create a group', () => {
    cy.visit('/')
      .login()
      .getByTestId('dashboardPage');
  });

  it('Create a primary metric objective', () => {
    cy.visit('/')
      .login()
      .getByTestId('dashboardPage')
      .wait(1000)
      .getByText(/create a new project/i)
      .click()
      .getByTestId('addProjectModal')
      .getByPlaceholderText(/project name/i)
      .type(fakeProjectName)
      .getByText(/save/i)
      .click()
      .getByTestId('dashboardPage')
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      // create a new metric objective
      .getByText(/ADD A PRIMARY OBJECTIVE/i)
      .click()
      .getByTestId('objectiveModal')
      .getByPlaceholderText(/name your objective/i)
      .type(fakeObjectiveName)
      .getByText(/Track An Amount/i)
      .getByPlaceholderText(/name the things you will be tracking/i)
      .type(fakeObjectiveDescription)
      .get('.ant-calendar-picker-input')
      .click({ force: true })
      .get("[title='August 30, 2019']")
      .click()
      .getByText(/save/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      .getAllByText(fakeObjectiveDescription);
  });

  it('edit and update a primary metric objectives', () => {
    // fakeProjectName = 'adipisci autem blanditiis';
    // fakeObjectiveName = 'some some';

    const fakeObjectiveDescription2 = lorem.sentence();
    const fakeNumber = random.number();
    const fakeNumber2 = random.number();
    cy.visit('/')
      .getByTestId('dashboardPage')
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      .getByTestId(fakeObjectiveName)
      .click()
      .getByPlaceholderText(/add an update here/i)
      .type(fakeNumber)
      .getByText(/add update/i)
      .click()
      .getByPlaceholderText(/add an update here/i)
      .getByText(`Value updated to ${fakeNumber.toString()}`)
      // add name, deadline, type, complete
      .getByTestId('objectiveDescriptionInput')
      .clear()
      .type(fakeObjectiveDescription2)
      .get('.ant-calendar-picker-input')
      .click({ force: true })
      .get("[title='August 31, 2019']")
      .click()
      // check updates
      .getByText(/save/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      .getByText(fakeNumber.toString())
      .getByText(fakeObjectiveDescription2)
      .getAllByText(`Ends on August 31st, 2019`)
      // update again but just a single field
      .getByTestId(fakeObjectiveName)
      .click()
      .getByPlaceholderText(/add an update here/i)
      .type(fakeNumber2)
      .getByText(/add update/i)
      .click()
      .getByText(/save/i)
      .click()
      .getByText(fakeNumber2.toString())
      .getAllByText(fakeObjectiveDescription2);
  });

  it('complete a primary metric objectives', () => {
    // fakeProjectName = 'adipisci autem blanditiis';
    // fakeObjectiveName2 = 'lolo';

    cy.visit('/')
      .getByTestId('dashboardPage')
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      .get("[data-testid='primaryObjectives']")
      .within(() => cy.getByTestId(fakeObjectiveName).click())
      .getByText('This objective is now complete')
      .click()
      .getByText(/save/i)
      .click()
      .get("[data-testid='primaryObjectives']")
      .within(() => cy.queryByText(fakeProjectName).should('not.exist'));
  });

  it('deletes a primary metric', () => {
    cy.visit('/')
      .getByTestId('dashboardPage')
      .getByText(fakeProjectName)
      .click()
      .getByTestId('projectPage')
      // create a new metric objective
      .getByText(/ADD A PRIMARY OBJECTIVE/i)
      .click()
      .getByTestId('objectiveModal')
      .getByPlaceholderText(/name your objective/i)
      .type(fakeObjectiveName3)
      .getByText(/Track An Amount/i)
      .getByPlaceholderText(/name the things you will be tracking/i)
      .type(fakeObjectiveDescription)
      .get('.ant-calendar-picker-input')
      .click({ force: true })
      .get("[title='August 30, 2019']")
      .click()
      .getByText(/save/i)
      .click()
      .queryByTestId('addProjectModal')
      .should('not.exist')
      .getAllByText(fakeObjectiveDescription)
      .get("[data-testid='primaryObjectives']")
      .within(() => cy.getByTestId(fakeObjectiveName3).click())
      .getByTestId('deleteProject')
      .click()
      .getByText(/confirm delete/i)
      .click()
      .get("[data-testid='primaryObjectives']")
      .within(() => cy.queryByTestId(fakeObjectiveName3).should('not.exist'));
  });
});

// describe('milestone objectives', () => {
//   const fakeProjectName = lorem.words();
//   const fakeObjectiveName = lorem.words();
//   const fakeObjectiveName2 = lorem.words();
//   const fakeObjectiveName3 = lorem.words();
//   const fakeObjectiveDescription = lorem.sentence();

//   it('Create a primary metric objective', () => {
//     cy.visit('/')
//       .getByTestId('dashboardPage')
//       .getByText(fakeProjectName)
//       .click()
//       .getByTestId('projectPage')
//       // create a new metric objective
//       .getByText(/ADD A PRIMARY OBJECTIVE/i)
//       .click()
//       .getByTestId('objectiveModal')
//       .getByPlaceholderText(/name your objective/i)
//       .type(fakeObjectiveName)
//       .getByText(/Achieve Something/i)
//       .getByPlaceholderText(/describe the final deliverable you intend to produce/i)
//       .type(fakeObjectiveDescription)
//       .get('.ant-calendar-picker-input')
//       .click({ force: true })
//       .get("[title='August 30, 2019']")
//       .click()
//       .getByText(/save/i)
//       .click()
//       .queryByTestId('addProjectModal')
//       .should('not.exist')
//       .getAllByText(fakeObjectiveName);
//       .getAllByText(fakeObjectiveDescription);
//   });

//   it('edit and update a primary metric objectives', () => {
//     // fakeProjectName = 'adipisci autem blanditiis';
//     // fakeObjectiveName = 'some some';

//     const fakeObjectiveDescription2 = lorem.sentence();
//     const fakeNumber = random.number();
//     const fakeNumber2 = random.number();
//     cy.visit('/')
//       .getByTestId('dashboardPage')
//       .getByText(fakeProjectName)
//       .click()
//       .getByTestId('projectPage')
//       .getByTestId(fakeObjectiveName)
//       .click()
//       .getByPlaceholderText(/add an update here/i)
//       .type(fakeNumber)
//       .getByText(/add update/i)
//       .click()
//       .getByPlaceholderText(/add an update here/i)
//       .getByText(`Value updated to ${fakeNumber.toString()}`)
//       // add name, deadline, type, complete
//       .getByTestId('objectiveDescriptionInput')
//       .clear()
//       .type(fakeObjectiveDescription2)
//       .get('.ant-calendar-picker-input')
//       .click({ force: true })
//       .get("[title='August 31, 2019']")
//       .click()
//       // check updates
//       .getByText(/save/i)
//       .click()
//       .queryByTestId('addProjectModal')
//       .should('not.exist')
//       .getByText(fakeNumber.toString())
//       .getByText(fakeObjectiveDescription2)
//       .getAllByText(`Ends on August 31st, 2019`)
//       // update again but just a single field
//       .getByTestId(fakeObjectiveName)
//       .click()
//       .getByPlaceholderText(/add an update here/i)
//       .type(fakeNumber2)
//       .getByText(/add update/i)
//       .click()
//       .getByText(/save/i)
//       .click()
//       .getByText(fakeNumber2.toString())
//       .getAllByText(fakeObjectiveDescription2);
//   });

//   it('complete a primary metric objectives', () => {
//     // fakeProjectName = 'adipisci autem blanditiis';
//     // fakeObjectiveName2 = 'lolo';

//     cy.visit('/')
//       .getByTestId('dashboardPage')
//       .getByText(fakeProjectName)
//       .click()
//       .getByTestId('projectPage')
//       .get("[data-testid='primaryObjectives']")
//       .within(() => cy.getByTestId(fakeObjectiveName2).click())
//       .getByText('This objective is now complete')
//       .click()
//       .getByText(/save/i)
//       .click()
//       .get("[data-testid='primaryObjectives']")
//       .within(() => cy.queryByText(fakeProjectName).should('not.exist'));
//   });

//   it('deletes a primary metric', () => {
//     cy.visit('/')
//       .getByTestId('dashboardPage')
//       .getByText(fakeProjectName)
//       .click()
//       .getByTestId('projectPage')
//       // create a new metric objective
//       .getByText(/ADD A PRIMARY OBJECTIVE/i)
//       .click()
//       .getByTestId('objectiveModal')
//       .getByPlaceholderText(/name your objective/i)
//       .type(fakeObjectiveName3)
//       .getByText(/Track An Amount/i)
//       .getByPlaceholderText(/name the things you will be tracking/i)
//       .type(fakeObjectiveDescription)
//       .get('.ant-calendar-picker-input')
//       .click({ force: true })
//       .get("[title='August 30, 2019']")
//       .click()
//       .getByText(/save/i)
//       .click()
//       .queryByTestId('addProjectModal')
//       .should('not.exist')
//       .getAllByText(fakeObjectiveDescription)
//       .get("[data-testid='primaryObjectives']")
//       .within(() => cy.getByTestId(fakeObjectiveName3).click())
//       .getByTestId('deleteProject')
//       .click()
//       .getByText(/confirm delete/i)
//       .click()
//       .get("[data-testid='primaryObjectives']")
//       .within(() => cy.queryByTestId(fakeObjectiveName3).should('not.exist'));
//   });
// });

// it.skip('details show on timeline when a metric objective is completed', () => {
//   // fakeProjectName = 'adipisci autem blanditiis';
//   // fakeObjectiveName = 'hex';
//   cy.visit('/')
//     .getByTestId('dashboardPage')
//     .getByText(fakeProjectName)
//     .click()
//     .getByTestId('projectPage')
//     .getByText(fakeObjectiveName)
//     .queryByText(/hexes/i)
//     .should('not.be.visible')
//     .getByText(/hex/i)
//     .trigger('mouseover')
//     .getByText(/hexes/i)
//     .should('be.visible');
// });

// test chart updates

// name a group
// edit a group
// delete a grouo
// add project in a group
// edit in a group
// delete in a group
