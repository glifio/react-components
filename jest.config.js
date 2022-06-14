/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/node_modules/**'
  ],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {},
  jest: {
    extensionsToTreatAsEsm: ['.ts']
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom'
}
