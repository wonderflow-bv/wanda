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
      transformIgnorePatterns: ['/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)'],
    },
    {
      displayName: 'themes',
      roots: ['<rootDir>/packages/themes'],
      modulePathIgnorePatterns: ['dist'],
    },
    {
      displayName: 'tokens',
      roots: ['<rootDir>/packages/tokens'],
    },
    {
      displayName: 'charts',
      roots: ['<rootDir>/packages/charts/'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/packages/charts/src/$1',
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file_mock.js',
      },
      modulePathIgnorePatterns: ['dist'],
      transformIgnorePatterns: ['/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)'],
    },
  ],
  verbose: true,
};
