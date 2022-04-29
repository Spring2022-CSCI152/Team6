module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: { '^.+\\.(css|less)$': '<rootDir>/src/test/CSSStub.js'},
};