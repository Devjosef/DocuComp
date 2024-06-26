import { defaults } from 'jest-config';

const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/../config/jest.setup.js'], // Corrected path to setup file
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: '<rootDir>/../coverage', // Specify coverage output directory
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'], // Add TypeScript support
  testEnvironment: 'jest-environment-jsdom', // Ensure jsdom environment is specified
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  roots: ['<rootDir>/../DocuComp/tests'], // Corrected path to tests directory
};

export default config;