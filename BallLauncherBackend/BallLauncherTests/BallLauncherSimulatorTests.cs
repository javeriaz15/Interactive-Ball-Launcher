using Xunit;
using BallLauncherApi;

public class BallLauncherSimulatorTests
{
    [Fact]
    public void CalculateLaunchParameters_ValidInputs_ReturnsExpectedValues()
    {
        // Arrange
        var simulator = new BallLauncherSimulator(
            startingAngle: 0,
            motorTorque: 2,
            ballReleaseAngle: 45,
            ballWeight: 1
        );

        // Act
        var result = simulator.CalculateLaunchParameters();

        // Assert
        Assert.Equal(40.816327, result.distance, 6);
        Assert.Equal(10.204082, result.maxHeight, 6);
    }

    [Theory]
    [InlineData(0, 2, 45, 0)]    // Zero ball weight
    [InlineData(0, 2, 45, -1)]   // Negative ball weight
    [InlineData(0, 0, 45, 1)]    // Zero motor torque
    [InlineData(0, -1, 45, 1)]   // Negative motor torque
    [InlineData(0, 2, 0, 1)]     // Release angle at lower boundary
    [InlineData(0, 2, 90, 1)]    // Release angle at upper boundary
    public void CalculateLaunchParameters_InvalidInputs_ReturnsZero(
        double startingAngle,
        double motorTorque,
        double ballReleaseAngle,
        double ballWeight)
    {
        // Arrange
        var simulator = new BallLauncherSimulator(
            startingAngle,
            motorTorque,
            ballReleaseAngle,
            ballWeight
        );

        // Act
        var result = simulator.CalculateLaunchParameters();

        // Assert
        Assert.Equal(0, result.distance);
        Assert.Equal(0, result.maxHeight);
    }
}