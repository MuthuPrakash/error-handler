module.exports = {
    "roots": [
        "<rootDir>/src",
    ],
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testEnvironment": "node",
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "reporters": ["default", "jest-junit"]
}