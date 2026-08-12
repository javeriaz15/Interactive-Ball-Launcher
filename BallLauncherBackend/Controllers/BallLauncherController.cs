using Microsoft.AspNetCore.Mvc;

namespace BallLauncherApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BallLauncherController : ControllerBase
    {
        [HttpPost]
        [Route("calculateLaunchDistance")]
        public IActionResult CalculateLaunchDistance([FromBody] LaunchParameters parameters)
        {
            if (parameters == null || parameters.BallWeight <= 0 || parameters.MotorTorque <= 0 || parameters.BallReleaseAngle <= 0 || parameters.BallReleaseAngle >= 90)
            {
                return BadRequest("Invalid input parameters."); // Return error message
            }

            var simulator = new BallLauncherSimulator(parameters.StartingAngle, parameters.MotorTorque, parameters.BallReleaseAngle, parameters.BallWeight);
            var result = simulator.CalculateLaunchParameters();
            return Ok(new { distance = result.distance, maxHeight = result.maxHeight });
        }
    }

    public class LaunchParameters
    {
        public double StartingAngle { get; set; }
        public double MotorTorque { get; set; }
        public double BallReleaseAngle { get; set; }
        public double BallWeight { get; set; }
    }
}
