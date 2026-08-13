Ball Launcher Simulator

Project Description
The Ball Launcher Simulator allows users to input various parameters such as the starting angle, motor torque, ball release angle, and ball weight to simulate the launch of a ball. The simulation provides the launch distance and visualizes the trajectory of the ball.

Technologies Used
- .NET Core for the backend API
- JavaScript, HTML, and CSS for the frontend
- Cypress for end-to-end testing
- xUnit for backend unit testing

Project Structure
BallLauncherBackend/
|_ Controllers/
|  |_ BallLauncherController.cs
|_ Properties/
|_ bin/
|_ obj/
|_ appsettings.Development.json
|_ appsettings.json
|_ BallLauncherApi.csproj
|_ BallLauncherApi.http
|_ BallLauncherApi.sln
|_ BallLauncherSimulator.cs
|_ Program.cs
|
|_ BallLauncherTests/
   |_ bin/
   |_ obj/
   |_ BallLauncherSimulatorTests.cs
   |_ BallLauncherTests.csproj

BallLauncherFrontend/
|_ index.html
|_ cypress/
   |_ e2e/
      |_ test_ball_launcher_spec.cy.js
   |_ fixtures/
   |_ integration/
      |_ test_ball_launcher_spec.js
   |_ support/

Purpose of Key Files
1- BallLauncherBackend/BallLauncherApi.csproj: 
The project file for the backend API, managing dependencies and configurations for the project.

2- BallLauncherBackend/BallLauncherSimulator.cs: 
Contains the core logic for calculating the ball's trajectory based on the input parameters.

3- BallLauncherBackend/BallLauncherTests.csproj: 
The project file for the backend tests, managing dependencies and configurations for the test project.

4- BallLauncherBackend/Controllers/BallLauncherController.cs: 
The API controller handling POST requests to calculate the launch distance and validating input parameters. Returns error messages for invalid inputs.

5- BallLauncherFrontend/index.html: 
The main frontend file for the Ball Launcher Simulator, containing the UI elements and JavaScript code for interacting with the backend. It visualizes the trajectory of a launched ball based on user inputs. The simulation dynamically adjusts the canvas size and includes an animation influenced by a user-controlled simulation speed. Users can also hover over the trajectory to view the x and y coordinates of the ball at various points.

6- BallLauncherFrontend/cypress/e2e/test_ball_launcher_spec.cy.js: 
Contains Cypress end-to-end tests for the frontend application, validating the simulation functionality, error handling, and reset functionality.

Setup and Running the Simulator
Prerequisites
- .NET SDK
- Node.js and npm
- Cypress
- Visual Studio Code (option to view codes in an Editor)


Installing Dependencies
.NET SDK: Download and install the .NET SDK from the official .NET download page (https://dotnet.microsoft.com/en-us/download).
Node.js and npm: Download and install Node.js (which includes npm) from the official Node.js download page (https://nodejs.org/en).
Cypress: Cypress can be installed using npm. The command is provided in the frontend setup section.

*Backend Setup*
1. Navigate to the Backend Directory:
cd BallLauncherBackend

2. Restore Dependencies:
dotnet restore

3. Build the Project:
dotnet build

4. Run Unit Tests:
dotnet test BallLauncherApi.sln
Note: The unit tests for the backend are written using xUnit and cover various scenarios for the BallLauncherSimulator, such as valid inputs returning correct values and invalid ball weights returning zero.

5. Run and Start the Backend Server:
dotnet run
Note: The backend server will start at http://localhost:5293.

Note: 
If you run into any error, please delete the bin and obj files in the BallLauncherBackend folder and BalLauncherTests folder. And retry from step 1. 

*Frontend Setup*
1. Navigate to the Frontend Directory:
cd BallLauncherFrontend

2. Install Dependencies
npm install 

3. Serve the Frontend:
npx serve

Note: The frontend will be available at http://localhost:3000

4. UI:
Copy and paste http://localhost:3000 on a browser, to view and manually test the UI. 

Frontend Features
Simulation Speed: Adjust the speed of the simulation using the range slider labeled "Simulation Speed".
Simulate Button: Starts the simulation based on the provided input parameters.
Reset Button: Resets all input fields to their default values and clears the simulation canvas.

Error Handling in Frontend
If invalid input parameters are provided (e.g., negative angles, zero motor torque), the frontend should display an error message indicating "Invalid input parameters."

Frontend Testing Examples
These are some testing examples for the frontend simulation:

Example 1: Starting Angle: 30 degrees, Motor Torque: 1.5 NM, Ball Release Angle: 45 degrees, Ball Weight: 0.5 kg

Example 2: Starting Angle: 45 degrees, Motor Torque: 2.0 NM, Ball Release Angle: 60 degrees, Ball Weight: 1.0 kg

Example 3: Starting Angle: 60 degrees, Motor Torque: 1.0 NM, Ball Release Angle: 30 degrees, Ball Weight: 1.5 kg


*Running the Application*
1. Start Backend Server:
dotnet run

2. Start Frontend Server:
npx serve

*Running Cypress Tests*
1. Open Cypress:
Navigate to frontend folder 'BallLauncherFrontend', open command prompt, and then open Cypress
npx cypress open

2. Run the Tests:
In the Cypress UI, go for E2E testing using "Google Chrome". Select the test file test_ball_launcher_spec.cy.js located in the cypress/e2e directory and run it. This will execute the tests to verify the functionality of the frontend simulation.

Screen Recording
A short screen recording demonstrating the simulator and tests can be found here: https://drive.google.com/file/d/1bv_NnqEDVXCLBi6Cq64Nj8CJk7bQXvin/view?usp=sharing

Future Improvements
1- Upgrade the current 2D canvas simulation to a 3D simulation using WebGL or Three.js. 
2- Expand the unit tests to cover more edge cases and potential failure points.
3- Simulate additional real-world factors such as air resistance, spin, and variable gravitational effects.
4- Add dynamic charts and graphs to visualize parameters like velocity, acceleration, and trajectory in real-time.
5- Add user authentication to save simulation settings and results. 
