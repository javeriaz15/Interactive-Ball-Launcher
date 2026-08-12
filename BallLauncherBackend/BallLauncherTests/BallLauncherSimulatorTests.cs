using Xunit;
using BallLauncherApi;

public class BallLauncherSimulatorTests
{
    [Fact]
    public void CalculateLaunchParameters_ValidInputs_ReturnsCorrectValues()
    {
        var simulator = new BallLauncherSimulator(0, 2, 45, 1);
        var result = simulator.CalculateLaunchParameters();
        Assert.True(result.distance > 0, "Distance should be greater than 0");
        Assert.True(result.maxHeight > 0, "Max Height should be greater than 0");
    }

    [Fact]
    public void CalculateLaunchParameters_InvalidBallWeight_ReturnsZero()
    {
        var simulator = new BallLauncherSimulator(0, 2, 45, 0);
        var result = simulator.CalculateLaunchParameters();
        Assert.Equal(0, result.distance);
        Assert.Equal(0, result.maxHeight);
    }
}
