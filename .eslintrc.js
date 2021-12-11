const path = require('path');

module.exports = {
  globals: {
    PRODUCTION: 'readonly',
  },
  extends: [
    'airbnb-base',
    'plugin:functional/external-recommended',
    'plugin:functional/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'functional',
    'react',
  ],
  env: {
    browser: true,
    webextensions: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/extensions': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'functional/no-conditional-statement': 0,
    'functional/no-expression-statement': 0,
    'functional/immutable-data': 0,
    'functional/functional-parameters': 0,
    'functional/no-try-statement': 0,
    'functional/no-throw-statement': 0,
  },
  parser: '@babel/eslint-parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.common.js'),
      },
    },
  },
};
