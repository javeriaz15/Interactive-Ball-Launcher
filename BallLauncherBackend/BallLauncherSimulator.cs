namespace BallLauncherApi
{
    public class BallLauncherSimulator
    {
        private const double MOTOR_TORQUE = 2.0; // NM
        private const double MOTOR_SPEED = 20.0; // radians/second
        private const double GRAVITY = 9.8; // m/s^2

        public double StartingAngle { get; set; }
        public double MotorTorque { get; set; }
        public double BallReleaseAngle { get; set; }
        public double BallWeight { get; set; }

        public BallLauncherSimulator(double startingAngle, double motorTorque, double ballReleaseAngle, double ballWeight)
        {
            StartingAngle = startingAngle;
            MotorTorque = motorTorque;
            BallReleaseAngle = ballReleaseAngle;
            BallWeight = ballWeight;
        }

        public (double distance, double maxHeight) CalculateLaunchParameters()
        {
            if (BallWeight <= 0 || MotorTorque <= 0 || BallReleaseAngle <= 0 || BallReleaseAngle >= 90)
            {
                return (0, 0); // Invalid input conditions
            }

            double angularAcceleration = MotorTorque / (BallWeight * Math.Pow(MOTOR_SPEED, 2));
            double timeToMaxSpeed = MOTOR_SPEED / angularAcceleration;
            double launchVelocity = angularAcceleration * timeToMaxSpeed;
            double releaseAngleRad = BallReleaseAngle * (Math.PI / 180);
            double distance = Math.Pow(launchVelocity, 2) * Math.Sin(2 * releaseAngleRad) / GRAVITY;
            double velocityY = launchVelocity * Math.Sin(releaseAngleRad);
            double maxHeight = Math.Pow(velocityY, 2) / (2 * GRAVITY);

            return (distance, maxHeight);
        }
    }
}
