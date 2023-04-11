module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        // 'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:import/typescript',
        'plugin:react/recommended',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 0,
    },
}
