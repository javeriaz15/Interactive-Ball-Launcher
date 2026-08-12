describe('Ball Launcher Simulator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
      .then(() => {
        cy.log('Page loaded successfully');
      });
  });
    
    // Test for Valid Input
    it('should display launch distance after simulation', () => {
        cy.get('#startingAngle').clear().type('0');
        cy.get('#motorTorque').clear().type('2');
        cy.get('#ballReleaseAngle').clear().type('45');
        cy.get('#ballWeight').clear().type('1');
        
        cy.contains('Simulate').click();
        
        cy.get('#distanceOutput').should('contain.text', 'Launch Distance');
    });
    
    // Test for Invalid Input
    it('should display error message for invalid input', () => {
      cy.get('#startingAngle').clear().type('-10'); // Invalid starting angle
      cy.get('#motorTorque').clear().type('0'); // Invalid motor torque
      cy.get('#ballReleaseAngle').clear().type('100'); // Invalid release angle
      cy.get('#ballWeight').clear().type('-1'); // Invalid ball weight
        
        cy.contains('Simulate').click();
        
        cy.get('#distanceOutput').should('contain.text', 'Invalid input parameters.');
    });
    
    // Test for Reset Functionality
    it('should reset input fields and output', () => {
        cy.get('#startingAngle').clear().type('30');
        cy.get('#motorTorque').clear().type('1.5');
        cy.get('#ballReleaseAngle').clear().type('50');
        cy.get('#ballWeight').clear().type('0.5');
        
        cy.contains('Simulate').click();
        cy.contains('Reset').click();
        
        cy.get('#startingAngle').should('have.value', '0');
        cy.get('#motorTorque').should('have.value', '2');
        cy.get('#ballReleaseAngle').should('have.value', '45');
        cy.get('#ballWeight').should('have.value', '1');
        cy.get('#distanceOutput').should('be.empty');
    });
    });
    