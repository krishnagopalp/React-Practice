module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  jest: {
    configure: {
      moduleNameMapper: { "^axios$": "axios/dist/node/axios.cjs" },
    },
  },
};
