module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.+(ts)?(x)', '**/+(*.)+(spec|test).+(ts)?(x)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'json', 'js']
};
