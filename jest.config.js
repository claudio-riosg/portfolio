module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@testing/(.*)$': '<rootDir>/src/testing/$1',
    '^@testing/mocks$': '<rootDir>/src/testing/mocks/index.ts',
    '^@testing/mocks/(.*)$': '<rootDir>/src/testing/mocks/$1',
  },
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!@angular|rxjs)"],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/html-comment",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/no-ng-attributes",
  ],
  testMatch: [
    "**/+(*.)+(spec).ts",
  ],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/app/**/.ts",
    "!src/app//*.module.ts",
    "!src/app/app.routing.ts",
    "!src/app/environments//.ts",
    "!src/app/**/.d.ts",
  ],
};