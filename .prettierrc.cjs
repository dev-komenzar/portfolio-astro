module.exports = {
	plugins: [
		require.resolve('prettier-plugin-tailwindcss'),
		require.resolve('prettier-plugin-astro'),
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	semi: false,
	useTabs: true,
	tabWidth: 2,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'all',
	jsxSingleQuote: true,
	bracketSpacing: true,
}
