module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    "quotes": ["error", "single"],
    "no-extra-semi": "warn",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-constant-condition': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-dupe-keys': "error",
    "no-extra-semi": "error",
    "vue/valid-template-root": "off",
    "vue/no-parsing-error": ["off", {
      "abrupt-closing-of-empty-comment": true,
      "absence-of-digits-in-numeric-character-reference": true,
      "cdata-in-html-content": true,
      "character-reference-outside-unicode-range": true,
      "control-character-in-input-stream": true,
      "control-character-reference": true,
      "eof-before-tag-name": true,
      "eof-in-cdata": true,
      "eof-in-comment": true,
      "eof-in-tag": true,
      "incorrectly-closed-comment": true,
      "incorrectly-opened-comment": true,
      "invalid-first-character-of-tag-name": true,
      "missing-attribute-value": true,
      "missing-end-tag-name": true,
      "missing-semicolon-after-character-reference": true,
      "missing-whitespace-between-attributes": true,
      "nested-comment": true,
      "noncharacter-character-reference": true,
      "noncharacter-in-input-stream": true,
      "null-character-reference": true,
      "surrogate-character-reference": true,
      "surrogate-in-input-stream": true,
      "unexpected-character-in-attribute-name": true,
      "unexpected-character-in-unquoted-attribute-value": true,
      "unexpected-equals-sign-before-attribute-name": true,
      "unexpected-null-character": true,
      "unexpected-question-mark-instead-of-tag-name": true,
      "unexpected-solidus-in-tag": true,
      "unknown-named-character-reference": true,
      "end-tag-with-attributes": true,
      "duplicate-attribute": true,
      "end-tag-with-trailing-solidus": true,
      "non-void-html-element-start-tag-with-trailing-solidus": false,
      "x-invalid-end-tag": true,
      "x-invalid-namespace": true
    }]
  }
}
