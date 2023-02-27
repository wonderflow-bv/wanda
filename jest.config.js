/* eslint-disable max-len */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  projects: [
    {
      displayName: 'react-components',
      roots: ['<rootDir>/packages/react-components/'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/packages/react-components/src/$1',
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file_mock.js',
      },
      modulePathIgnorePatterns: ['dist'],
    },
    {
      displayName: 'themes',
      roots: ['<rootDir>/packages/themes/'],
    },
    {
      displayName: 'tokens',
      roots: ['<rootDir>/packages/tokens/'],
    },
  ],
  verbose: true,
};
