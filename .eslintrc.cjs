module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'plugin:astro/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
	},
	rules: {
		'react/jsx-curly-brace-presence': [
			'warn',
			{
				props: 'never',
				children: 'never',
				propElementValues: 'always',
			},
		],
	},
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Enable this plugin
			plugins: ['astro'],
			env: {
				// Enables global variables available in Astro components.
				node: true,
				'astro/astro': true,
				es2020: true,
			},
			// Allows Astro components to be parsed.
			parser: 'astro-eslint-parser',
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
				// The script of Astro components uses ESM.
				sourceType: 'module',
			},
			rules: {
				// Enable recommended rules
				'astro/no-conflict-set-directives': 'error',
				'astro/no-unused-define-vars-in-style': 'error',

				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			},
		},
		{
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			files: ['**/*.astro/*.js', '*.astro/*.js'],
			env: {
				browser: true,
				es2020: true,
			},
			parserOptions: {
				sourceType: 'module',
			},
			rules: {
				// override/add rules settings here, such as:
				// "no-unused-vars": "error"

				// If you are using "prettier/prettier" rule,
				// you don't need to format inside <script> as it will be formatted as a `.astro` file.
				// 'prettier/prettier': 'off',
				'react/jsx-curly-brace-presence': [
					'warn',
					{
						props: 'never',
						children: 'never',
						propElementValues: 'always',
					},
				],
			},
		},
		{
			// Define the config for `react-typescript` files
			files: ['*.tsx'],
			extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			settings: {
				react: {
					version: 'detect',
				},
			},
			rules: {
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
					},
				],
			},
		},
		{
			files: ['*.cjs'],
			env: {
				node: true,
			},
		},
	],
}
