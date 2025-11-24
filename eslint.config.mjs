import next from 'eslint-config-next'

export default [
  {
    ignores: ['out/**', '.next/**', 'node_modules/**']
  },
  ...next(['core-web-vitals', 'typescript']),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
]
