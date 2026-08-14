const {
  Before,
  Given,
  When,
  Then,
} = require('@cucumber/cucumber');

const assert = require('node:assert/strict');

const apiBaseUrl =
  process.env.BALL_LAUNCHER_API_URL ||
  'http://localhost:5293';


Before(function () {
  this.launchParameters = {
    startingAngle: 0,
    motorTorque: 2,
    ballReleaseAngle: 45,
    ballWeight: 1,
  };

  this.response = null;
  this.responseBody = null;
});


Given('a valid launch configuration', function () {
  this.launchParameters = {
    startingAngle: 0,
    motorTorque: 2,
    ballReleaseAngle: 45,
    ballWeight: 1,
  };
});


Given('the motor torque is {float}', function (motorTorque) {
  this.launchParameters.motorTorque = motorTorque;
});


Given(
  'the release angle is {float} degrees',
  function (ballReleaseAngle) {
    this.launchParameters.ballReleaseAngle =
      ballReleaseAngle;
  }
);


When('I request the launch calculation', async function () {
  this.response = await fetch(
    `${apiBaseUrl}/BallLauncher/calculateLaunchDistance`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(
        this.launchParameters
      ),
    }
  );

  const responseText =
    await this.response.text();

  try {
    this.responseBody =
      JSON.parse(responseText);
  } catch {
    this.responseBody =
      responseText;
  }
});


Then('the launch request should succeed', function () {
  assert.equal(
    this.response.status,
    200
  );
});


Then('the launch request should be rejected', function () {
  assert.equal(
    this.response.status,
    400
  );
});


Then('the launch distance should be positive', function () {
  assert.equal(
    typeof this.responseBody.distance,
    'number'
  );

  assert.ok(
    this.responseBody.distance > 0
  );
});


Then('the maximum height should be positive', function () {
  assert.equal(
    typeof this.responseBody.maxHeight,
    'number'
  );

  assert.ok(
    this.responseBody.maxHeight > 0
  );
});


Then(
  'the validation message should be {string}',
  function (expectedMessage) {
    assert.equal(
      this.responseBody,
      expectedMessage
    );
  }
);