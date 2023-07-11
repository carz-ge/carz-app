module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    '@react-native-community',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig-build.json',
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
    '@typescript-eslint/no-unused-vars': 'warn',
    'global-require': 'off',
    // '@typescript-eslint/no-empty-function': "off",
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/object-curly-spacing': 'off',
    // 'react-native/no-inline-styles': 'off', // 'error' todo
    // 'react/jsx-no-bind': 'off',
    // Prefer const over let.
    "prefer-const": "error",
    // Prefer template strings over concatenating with plus.
    "prefer-template": "error",
    "sonarjs/no-duplicate-string": "warn"
  },
  plugins: ['react', 'security', 'prettier', 'sonarjs', '@typescript-eslint'],
};
