process.env.TZ = 'GMT';

module.exports = {
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/node_modules/**', '!**/build/**', '!**/coverage/**', '!**/scripts/**'],
  modulePaths: ['./'],
  testMatch: ['**/*.{test,spec}.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
