using BallLauncherApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

public class BallLauncherControllerTests
{
    [Fact]
    public void CalculateLaunchDistance_ValidParameters_ReturnsOk()
    {
        // Arrange
        var controller = new BallLauncherController();

        var parameters = new LaunchParameters
        {
            StartingAngle = 0,
            MotorTorque = 2,
            BallReleaseAngle = 45,
            BallWeight = 1
        };

        // Act
        var result = controller.CalculateLaunchDistance(parameters);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Theory]
    [InlineData(0, 0, 45, 1)]   // Zero motor torque
    [InlineData(0, 2, 0, 1)]    // Release angle at lower boundary
    [InlineData(0, 2, 90, 1)]   // Release angle at upper boundary
    [InlineData(0, 2, 45, 0)]   // Zero ball weight
    public void CalculateLaunchDistance_InvalidParameters_ReturnsBadRequest(
        double startingAngle,
        double motorTorque,
        double ballReleaseAngle,
        double ballWeight)
    {
        // Arrange
        var controller = new BallLauncherController();

        var parameters = new LaunchParameters
        {
            StartingAngle = startingAngle,
            MotorTorque = motorTorque,
            BallReleaseAngle = ballReleaseAngle,
            BallWeight = ballWeight
        };

        // Act
        var result = controller.CalculateLaunchDistance(parameters);

        // Assert
        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid input parameters.", badRequest.Value);
    }
}