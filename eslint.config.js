import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-v-for-key': 'off',
      'no-prototype-builtins': 'off',
    },
  },
];
