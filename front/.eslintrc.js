module.exports = {
  root: true,

  env: {
    node: true
  },
  
  globals: { 
    _: false, 
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        projectName: 'app'
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