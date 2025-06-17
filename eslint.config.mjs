// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    languageOptions: {
      globals: {
        defineNuxtConfig: 'readonly',
      },
    },
  },
).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/ban-types': 'off',
  },
})
