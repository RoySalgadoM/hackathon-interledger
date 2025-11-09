module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended', '@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    // Prettier
    'prettier/prettier': 'error',

    // Console rules
    'no-console': [
      'error',
      {
        allow: ['warn', 'error']
      }
    ],

    // Unused variables and imports
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],

    // Unused imports
    'import/no-unused-modules': [
      'error',
      {
        unusedExports: true,
        src: ['src/**/*.ts'],
        ignoreExports: ['src/main.ts', 'src/app.module.ts']
      }
    ],

    // Unused imports detection
    'import/no-unresolved': 'off', // Disable for TypeScript projects
    'import/named': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'error',

    // TypeScript specific unused code detection
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // General unused code detection
    'no-unused-vars': 'off', // Turn off base rule as it conflicts with @typescript-eslint/no-unused-vars
    'no-undef': 'off', // TypeScript handles this

    // Security rules
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', '*.d.ts']
};
