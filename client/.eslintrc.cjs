module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended', // Add this for React-specific rules
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Add this for Prettier integration
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
        'react-refresh',
        '@typescript-eslint',
        'prettier',
        'import',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React to be in scope
        'react/prop-types': 'off', // Use TypeScript for type checking
        'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
        ],
        'prettier/prettier': 'warn', // Enable Prettier rules
        'import/order': [
            'warn',
            {
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the React version
        },
    },
}
