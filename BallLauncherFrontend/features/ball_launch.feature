Feature: Ball launch calculation

  As a user of the Ball Launcher Simulator
  I want launch parameters to be validated and calculated
  So that valid launches return meaningful trajectory metrics

  Scenario: Calculate a valid launch
    Given a valid launch configuration
    When I request the launch calculation
    Then the launch request should succeed
    And the launch distance should be positive
    And the maximum height should be positive

  Scenario: Reject zero motor torque
    Given a valid launch configuration
    And the motor torque is 0
    When I request the launch calculation
    Then the launch request should be rejected
    And the validation message should be "Invalid input parameters."

  Scenario Outline: Reject invalid release angles
    Given a valid launch configuration
    And the release angle is <angle> degrees
    When I request the launch calculation
    Then the launch request should be rejected
    And the validation message should be "Invalid input parameters."

    Examples:
      | angle |
      | 0     |
      | 90    |