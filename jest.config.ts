
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
      '^@mui/(.*)$': '<rootDir>/node_modules/@mui/$1'
    }
  };
  