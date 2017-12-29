import user1 from '../fixtures/testUsers'

describe('Homepage', () => {
  it('should have to correct title', () => {
    cy.visit('/')
    cy.title().should('eq', 'Pal Poll')
  })

  it('should render content on page', () => {
    cy.visit('/home')
    cy.contains('You are not logged in')
  })
})

describe('Signup', () => {
  it('login', () => {
    cy.visit('/home', {
      onBeforeLoad: function (win) {
        win.localStorage.setItem(user1.key, user1.token)
      }
    })
    cy.contains(`[data-test='create']`)
  })
})

describe('Single choice text Poll', () => {
  it('creates a poll', () => {
    cy.visit('/home', {
      onBeforeLoad: win => {
        win.localStorage.setItem(user1.key, user1.token)
      }
    })
    cy.get(`[data-test='create']`).click()
    cy.url().should('contain', 'create')
    cy.get(`[data-test='title']`).type('test question')
    cy.get(`[data-test='context']`).type('some context')
    cy.get(`[data-test='single']`).check()
    cy.get(`[data-test='image']`).check()
    cy.get(`[data-test='submit']`).click()
    cy.url().should('contain', 'questions')
    cy.get(`[data-test='add']`).click()
    cy.wait(5000)
    cy.get(`[data-test='question0']`).type('option 1')
    cy.get(`[data-test='add']`).click()
    cy.get(`[data-test='question1']`).type('option 2')
    cy.get(`[data-test='submit']`).click()
    cy.url().should('contain', 'congratulations')
    cy.get(`[data-test='poll']`).click()
    cy.url().should('contain', 'poll')
    cy.contains('option 1')
    cy.get(`[data-test='response0']`).check()
    cy.get(`[data-test='submit']`).click()
    cy.url().should('contain', 'done')
    cy.contains('Done!')
  })
})
