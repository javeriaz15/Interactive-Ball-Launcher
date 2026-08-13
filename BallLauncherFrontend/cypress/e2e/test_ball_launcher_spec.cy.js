describe('Ball Launcher Simulator', () => {
  // Backend endpoint used by the frontend when a simulation is submitted.
  const calculateLaunchDistanceUrl =
    'http://localhost:5293/BallLauncher/calculateLaunchDistance';

  // Reusable helper for entering launcher parameters into the form.
  const fillLaunchParameters = ({
    startingAngle,
    motorTorque,
    ballReleaseAngle,
    ballWeight,
  }) => {
    cy.get('#startingAngle').clear().type(String(startingAngle));
    cy.get('#motorTorque').clear().type(String(motorTorque));
    cy.get('#ballReleaseAngle').clear().type(String(ballReleaseAngle));
    cy.get('#ballWeight').clear().type(String(ballWeight));
  };

  beforeEach(() => {
    // Observe the real backend request so tests can synchronize with the API
    // instead of relying on fixed time delays.
    cy.intercept('POST', calculateLaunchDistanceUrl)
      .as('calculateLaunchDistance');

    // Uses the baseUrl configured in cypress.config.js.
    cy.visit('/');
  });

  it('displays the calculated launch distance for valid inputs', () => {
    fillLaunchParameters({
      startingAngle: 0,
      motorTorque: 2,
      ballReleaseAngle: 45,
      ballWeight: 1,
    });

    cy.contains('button', 'Simulate').click();

    // Verify the API succeeds and returns the expected response structure.
    cy.wait('@calculateLaunchDistance').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.distance).to.be.a('number');
      expect(response.body.maxHeight).to.be.a('number');
      expect(response.body.distance).to.be.greaterThan(0);

      // Confirm the frontend displays the value returned by the API.
      cy.get('#distanceOutput').should(
        'have.text',
        `Launch Distance: ${response.body.distance.toFixed(2)} meters`
      );
    });

    cy.get('#errorOutput').should('be.empty');
  });

  it('rejects zero motor torque', () => {
    fillLaunchParameters({
      startingAngle: 0,
      motorTorque: 0,
      ballReleaseAngle: 45,
      ballWeight: 1,
    });

    cy.contains('button', 'Simulate').click();

    // Invalid parameters should be rejected by the backend.
    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 400);

    cy.get('#errorOutput')
      .should('have.text', 'Invalid input parameters.');

    cy.get('#distanceOutput').should('be.empty');
  });

  it('resets inputs and output after a simulation', () => {
    fillLaunchParameters({
      startingAngle: 30,
      motorTorque: 1.5,
      ballReleaseAngle: 50,
      ballWeight: 0.5,
    });

    cy.contains('button', 'Simulate').click();

    // Wait for the simulation request to complete before resetting.
    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('#distanceOutput')
      .should('contain.text', 'Launch Distance');

    cy.contains('button', 'Reset').click();

    // Verify all controls and messages return to their default state.
    cy.get('#startingAngle').should('have.value', '0');
    cy.get('#motorTorque').should('have.value', '2');
    cy.get('#ballReleaseAngle').should('have.value', '45');
    cy.get('#ballWeight').should('have.value', '1');
    cy.get('#distanceOutput').should('be.empty');
    cy.get('#errorOutput').should('be.empty');
  });

  it('handles small positive input values', () => {
    fillLaunchParameters({
      startingAngle: 0,
      motorTorque: 0.1,
      ballReleaseAngle: 1,
      ballWeight: 0.1,
    });

    cy.contains('button', 'Simulate').click();

    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 200);

    // Verify a correctly formatted distance is displayed.
    cy.get('#distanceOutput')
      .invoke('text')
      .should('match', /Launch Distance: \d+\.\d{2} meters/);

    cy.get('#errorOutput').should('be.empty');
  });

  it('handles larger valid input values', () => {
    fillLaunchParameters({
      startingAngle: 90,
      motorTorque: 2,
      ballReleaseAngle: 89,
      ballWeight: 5,
    });

    cy.contains('button', 'Simulate').click();

    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('#distanceOutput')
      .invoke('text')
      .should('match', /Launch Distance: \d+\.\d{2} meters/);

    cy.get('#errorOutput').should('be.empty');
  });

  it('handles fractional input values', () => {
    fillLaunchParameters({
      startingAngle: 45.5,
      motorTorque: 1.75,
      ballReleaseAngle: 45.5,
      ballWeight: 1.25,
    });

    cy.contains('button', 'Simulate').click();

    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('#distanceOutput')
      .invoke('text')
      .should('match', /Launch Distance: \d+\.\d{2} meters/);

    cy.get('#errorOutput').should('be.empty');
  });

  it('rejects release-angle boundary values', () => {
    // Release angle must be greater than 0 degrees.
    cy.get('#ballReleaseAngle').clear().type('0');
    cy.contains('button', 'Simulate').click();

    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 400);

    cy.get('#errorOutput')
      .should('have.text', 'Invalid input parameters.');

    // Release angle must also be less than 90 degrees.
    cy.get('#ballReleaseAngle').clear().type('90');
    cy.contains('button', 'Simulate').click();

    cy.wait('@calculateLaunchDistance')
      .its('response.statusCode')
      .should('eq', 400);

    cy.get('#errorOutput')
      .should('have.text', 'Invalid input parameters.');
  });

  it('updates the simulation speed label when the slider changes', () => {
    // Simulate changing the speed slider through its input event.
    cy.get('#simulationSpeed')
      .invoke('val', 8)
      .trigger('input');

    cy.get('#simulationSpeed').should('have.value', '8');
    cy.get('#speedLabel').should('have.text', '8');
  });
});