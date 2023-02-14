module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'operator-linebreak': 0,
    indent: 0,
    'default-param-last': 0,
    'implicit-arrow-linebreak': 0,
    '@typescript-eslint/explicit-module-boundary-types': 1,
    'object-curly-newline': 0, // Prettier handles this
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0, // Can disable this rule in React v17+
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 0,
    'react/require-default-props': 1,
    'react/no-unknown-property': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {},
    },
    // Auto detect React version
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
};
