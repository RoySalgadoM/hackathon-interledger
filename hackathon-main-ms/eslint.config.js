module.exports = {
  files: ['src/**/*.ts'],
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json'
    },
    globals: {
      console: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      global: 'readonly',
      module: 'readonly',
      require: 'readonly',
      exports: 'readonly'
    }
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    import: require('eslint-plugin-import'),
    prettier: require('eslint-plugin-prettier')
  },
  rules: {
    // Prettier
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'crlf'
      }
    ],

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

    // Unused imports detection
    'import/no-unresolved': 'off', // Disable for TypeScript projects
    'import/named': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'off', // Disable due to false positives with TypeScript

    // TypeScript specific unused code detection
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

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
  }
};
