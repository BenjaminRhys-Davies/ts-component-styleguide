process.env.TZ = 'GMT';

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!**/node_modules/**', '!**/build/**', '!**/coverage/**', '!**/scripts/**'],
  coverageDirectory: './coverage',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  modulePaths: ['./'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{test,spec}.{ts,tsx}'],
};
