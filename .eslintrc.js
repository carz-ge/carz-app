module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off', // 'error' todo
  },
  plugins: ['security', 'prettier', 'sonarjs'],
};
