module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  parserOptions: {
    ecmaVersion: 'latest'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  overrides: [
    {
      files: [
        '**/src/**/*.spec.[jt]s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
