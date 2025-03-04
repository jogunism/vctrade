import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/test/**/*.ts"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@modals/(.*)$": "<rootDir>/src/components/modals/$1",
    "^@icons/(.*)$": "<rootDir>/src/components/icons/$1",
  },
};

export default config;
