module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'jsx-a11y',
    'jest',
    'react-hooks',
    'promise',
    'sonarjs',
    'prettier',
  ],
  rules: {
    'curly': ['error', 'all'],
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        variables: true,
      },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
        overrides: {
          properties: 'explicit',
        },
      }
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'react/display-name': 0
  },
  overrides: [
    {
      files: ['*.styled.ts'],
      rules: {
        // Enable styled components to use nested ternary declarations for simple prop logic
        'no-nested-ternary': 'off',
      },
    },
    {
      files: ['*.stories.{ts,tsx}'],
      rules: {
        // Enable stories to export a default to register component with storybook
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.{spec,test}.{ts,tsx}'],
      rules: {
        // Ensure that tests can mock imports before import
        'import/first': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
