process.env.TZ = 'GMT';

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/**/*.stories.{js,ts,tsx}', '!**/node_modules/**', '!**/build/**', '!**/coverage/**', '!**/scripts/**'],
  coverageDirectory: './coverage',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      diagnostics: false,
    },
  },
  modulePaths: ['./'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{test,spec}.{ts,tsx}'],
};
