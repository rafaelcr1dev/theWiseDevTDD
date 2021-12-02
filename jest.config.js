module.exports = {
    verbose: true,
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
      "^@/components(.*)$": "<rootDir>/src/components$1",
      '\\.(css|less|scss)$': '<rootDir>jest.cssTransform.js',
    },
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
      '<rootDir>/src/components/**/*.tsx',
      '<rootDir>/src/pages/api/**/*.tsx',
      '<rootDir>/src/helpers/**/*.ts',
      '<rootDir>/src/serializes/**/.ts',
      '!<rootDir>/src/serializes/index.ts',
      '!<rootDir>/src/helpers/index.ts',
      '!<rootDir>/src/components/**/index.tsx',
    ],
  };