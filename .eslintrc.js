module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    '@react-native-community',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'ecmaVersion': 'latest',
    "sourceType": "module",
    'ecmaFeatures': {
      'jsx': true
    }
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': "off",
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'global-require': 'off',
    'react-native/no-inline-styles': 'off', // 'error' todo
    'react/jsx-no-bind': 'off',
    // Prefer const over let.
    "prefer-const": "error",
    // Prefer template strings over concatenating with plus.
    "prefer-template": "error",
  },
  plugins: ['react', 'security', 'prettier', 'sonarjs', '@typescript-eslint'],
};
