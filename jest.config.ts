module.exports = {
  verbose: true,
  collectCoverage: true,
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  roots: ["<rootDir>/__tests__", "<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
