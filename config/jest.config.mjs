import { defaults } from 'jest-config';

const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'], // Ensure this path is correct
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/tests'], // Ensure this path is correct
};

export default config;