// eslint-disable-next-line
const fs = require('fs');

const foldersUnderSrc = fs
  .readdirSync('src', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
    es6: true,
  },
  // all of these globals are from the _old_ wp code
  globals: {
    angular: true,
    wp: true,
    jQuery: true,
    define: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'react-hooks', 'prettier', 'babel', 'import', 'simple-import-sort'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.tsx', '*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^react', '^@?\\w'],
              // Absolute imports and Relative imports.
              [`^(${foldersUnderSrc.join('|')})(/.*|$)`, '^\\.'],
              // for scss imports.
              ['^[^.]'],
            ],
          },
        ],
      },
    },
  ],
  rules: {
    'no-console': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    semi: 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'warn',
    // remove these if deprecating old scripts
    '@typescript-eslint/no-this-alias': 'warn',
    'no-empty': 'warn',
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'babel-module': {},
    },
  },
};
