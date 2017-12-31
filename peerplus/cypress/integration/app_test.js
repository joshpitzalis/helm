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
