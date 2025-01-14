module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/src/**/*.spec.[jt]s?(x)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/components/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  }
}
