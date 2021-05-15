module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '__tests__/(.+)\\.test\\.(js?|ts?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node'
}
