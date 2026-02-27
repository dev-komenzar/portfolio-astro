// eslint.config.js
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'
import astroParser from 'astro-eslint-parser'

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.astro'],
		// Manually add astro rules
		plugins: {
			astro: eslintPluginAstro,
		},
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
		},
		rules: {
			'astro/no-conflict-set-directives': 'error',
			'astro/no-deprecated-astro-canonicalurl': 'error',
			'astro/no-deprecated-astro-fetchcontent': 'error',
			'astro/no-deprecated-astro-resolve': 'error',
			'astro/no-deprecated-getentrybyslug': 'error',
			'astro/no-unused-define-vars-in-style': 'error',
			'astro/valid-compile': 'error',
		},
	},
	{
		files: ['**/*.astro'],
		// Manually add jsx-a11y rules
		plugins: {
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'astro/jsx-a11y/alt-text': 'error',
			'astro/jsx-a11y/anchor-has-content': 'error',
			'astro/jsx-a11y/anchor-is-valid': 'error',
			'astro/jsx-a11y/aria-activedescendant-has-tabindex': 'error',
			'astro/jsx-a11y/aria-props': 'error',
			'astro/jsx-a11y/aria-proptypes': 'error',
			'astro/jsx-a11y/aria-role': 'error',
			'astro/jsx-a11y/aria-unsupported-elements': 'error',
			'astro/jsx-a11y/autocomplete-valid': 'error',
			'astro/jsx-a11y/click-events-have-key-events': 'error',
			'astro/jsx-a11y/heading-has-content': 'error',
			'astro/jsx-a11y/html-has-lang': 'error',
			'astro/jsx-a11y/iframe-has-title': 'error',
			'astro/jsx-a11y/img-redundant-alt': 'error',
			'astro/jsx-a11y/interactive-supports-focus': 'error',
			'astro/jsx-a11y/label-has-associated-control': 'error',
			'astro/jsx-a11y/media-has-caption': 'error',
			'astro/jsx-a11y/mouse-events-have-key-events': 'error',
			'astro/jsx-a11y/no-access-key': 'error',
			'astro/jsx-a11y/no-autofocus': 'error',
			'astro/jsx-a11y/no-distracting-elements': 'error',
			'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
			'astro/jsx-a11y/no-noninteractive-element-interactions': 'error',
			'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
			'astro/jsx-a11y/no-noninteractive-tabindex': 'error',
			'astro/jsx-a11y/no-redundant-roles': 'error',
			'astro/jsx-a11y/no-static-element-interactions': 'error',
			'astro/jsx-a11y/role-has-required-aria-props': 'error',
			'astro/jsx-a11y/role-supports-aria-props': 'error',
			'astro/jsx-a11y/scope': 'error',
			'astro/jsx-a11y/tabindex-no-positive': 'error',
		},
	},
	eslintConfigPrettier,
)
