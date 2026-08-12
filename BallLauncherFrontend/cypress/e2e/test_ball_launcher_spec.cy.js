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
    cy.wait(500);
    cy.get('#motorTorque').clear().type('2');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('45');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('1');
    cy.wait(500);

    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#distanceOutput').should('contain.text', 'Launch Distance');
    cy.wait(2000);
  });

  // Test for Invalid Input
  it('should display error message for invalid input', () => {
    cy.get('#startingAngle').clear().type('-10'); // Invalid starting angle
    cy.wait(500);
    cy.get('#motorTorque').clear().type('0'); // Invalid motor torque
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('100'); // Invalid release angle
    cy.wait(500);
    cy.get('#ballWeight').clear().type('-1'); // Invalid ball weight
    cy.wait(500);
  
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#errorOutput').should('contain.text', 'Invalid input parameters.'); // Check the error output
    cy.wait(2000);
  });

  // Test for Reset Functionality
  it('should reset input fields and output', () => {
    cy.get('#startingAngle').clear().type('30');
    cy.wait(500);
    cy.get('#motorTorque').clear().type('1.5');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('50');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('0.5');
    cy.wait(500);
  
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.contains('Reset').click();
    cy.wait(1000);
  
    cy.get('#startingAngle').should('have.value', '0');
    cy.get('#motorTorque').should('have.value', '2');
    cy.get('#ballReleaseAngle').should('have.value', '45');
    cy.get('#ballWeight').should('have.value', '1');
    cy.get('#distanceOutput').should('be.empty');
    cy.get('#errorOutput').should('be.empty'); // Check that error output is also cleared
    cy.wait(2000);
  });

  // Additional Test for Minimum Valid Input
  it('should handle minimum valid input values', () => {
    cy.get('#startingAngle').clear().type('0');
    cy.wait(500);
    cy.get('#motorTorque').clear().type('0.1');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('1');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('0.1');
    cy.wait(500);
    
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#distanceOutput').should('contain.text', 'Launch Distance');
    cy.wait(2000);
  });

  // Additional Test for Maximum Valid Input
  it('should handle maximum valid input values', () => {
    cy.get('#startingAngle').clear().type('90');
    cy.wait(500);
    cy.get('#motorTorque').clear().type('2');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('89');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('5');
    cy.wait(500);
    
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#distanceOutput').should('contain.text', 'Launch Distance');
    cy.wait(2000);
  });

  // Additional Test for Fractional Input Values
  it('should handle fractional input values', () => {
    cy.get('#startingAngle').clear().type('45.5');
    cy.wait(500);
    cy.get('#motorTorque').clear().type('1.75');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('45.5');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('1.25');
    cy.wait(500);
    
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#distanceOutput').should('contain.text', 'Launch Distance');
    cy.wait(2000);
  });

  // Additional Test for Boundary Condition (Release Angle 0 and 90)
  it('should handle boundary conditions for release angle', () => {
    cy.get('#ballReleaseAngle').clear().type('0');
    cy.wait(500);
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#errorOutput').should('contain.text', 'Invalid input parameters.');
    
    cy.get('#ballReleaseAngle').clear().type('90');
    cy.wait(500);
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.get('#errorOutput').should('contain.text', 'Invalid input parameters.');
    cy.wait(2000);
  });

  // Additional Test UI Interaction - Simulation Speed Slider
  it('should change simulation speed based on slider', () => {
    cy.get('#simulationSpeed').invoke('val', 8).trigger('input');
    cy.wait(500);
    cy.get('#speedLabel').should('have.text', '8');
    cy.wait(2000);
  });

  // Additional Test for Reset Functionality after Simulation
  it('should reset input fields and output after simulation', () => {
    cy.get('#startingAngle').clear().type('30');
    cy.wait(500);
    cy.get('#motorTorque').clear().type('1.5');
    cy.wait(500);
    cy.get('#ballReleaseAngle').clear().type('50');
    cy.wait(500);
    cy.get('#ballWeight').clear().type('0.5');
    cy.wait(500);
    
    cy.contains('Simulate').click();
    cy.wait(1000);
    cy.contains('Reset').click();
    cy.wait(500);
    
    cy.get('#startingAngle').should('have.value', '0');
    cy.get('#motorTorque').should('have.value', '2');
    cy.get('#ballReleaseAngle').should('have.value', '45');
    cy.get('#ballWeight').should('have.value', '1');
    cy.get('#distanceOutput').should('be.empty');
    cy.get('#errorOutput').should('be.empty');
    cy.wait(2000);
  });

});
