module.exports = {
  extends: ['plugin:prettier/recommended', 'next/core-web-vitals', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 0,
    'no-confusing-arrow': 0,
    'arrow-parens': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    semi: 0,
    'react/forbid-prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 0,
    camelcase: 0,
    'import/no-named-as-default': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'import/no-anonymous-default-export': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ]
  }
}
