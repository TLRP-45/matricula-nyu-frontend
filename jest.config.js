const { default: preset } = require('jest-preset-angular/jest-preset');

module.exports = {
  ...preset,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
};
