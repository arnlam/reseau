module.exports = {
  root: true,

  env: {
    node: true
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'literal'
      }
    ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  plugins: [
    'graphql'
  ]
}