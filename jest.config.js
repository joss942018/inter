const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      [
        '@formatjs/icu-messageformat-parser',
        '@formatjs/icu-skeleton-parser',
        '@formatjs/fast-memoize',
        'next-intl',
        'use-intl',
        'intl-messageformat',
        'tslib',
      ].join('|') +
      ')/)',
  ],
});

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
