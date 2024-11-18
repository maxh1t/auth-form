import js from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({ ignores: ['dist'] }, pluginReact.configs.flat.recommended, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx,js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    import: pluginImport,
    prettier,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'no-console': ['warn', { allow: ['error', 'warn', 'debug'] }],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'max-warnings': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
})
