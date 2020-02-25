process.env.TZ = 'GMT';

module.exports = {
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!**/node_modules/**', '!**/build/**', '!**/coverage/**', '!**/scripts/**'],
  modulePaths: ['./'],
  testMatch: ['**/*.{test,spec}.{ts,tsx}'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
