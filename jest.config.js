/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: "server",
      preset: "ts-jest",
      testEnvironment: "node",
      rootDir: "<rootDir>/server"
    },
    {
      displayName: "client",
      preset: "ts-jest",
      testEnvironment: "jsdom",
      rootDir: "<rootDir>/src",
      transform: {
        "^.+\\.tsx?$": ["ts-jest", {
          tsconfig: "<rootDir>/tsconfig.test.json"
        }],
      },
      moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
      },
    }
  ]
};
