module.exports = {
  setupFiles: ['<rootDir>/__tests__/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/jest.setup.js', '/node_modules/']
}