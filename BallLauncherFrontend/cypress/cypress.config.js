module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000, // Increase the timeout to 120 seconds
    supportFile: false, // Specify if you don't have custom support files
    defaultCommandTimeout: 10000, // Increase the default command timeout to 10 seconds
    slowTestThreshold: 5000, // Consider tests slow if they take longer than 5 seconds
  },
  video: false, // Disable video recording to speed up tests
};