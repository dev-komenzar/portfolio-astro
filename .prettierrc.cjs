module.exports = {
	plugins: [
		require.resolve('prettier-plugin-tailwindcss'),
		require.resolve('prettier-plugin-astro'),
		require.resolve('prettier-plugin-svelte'),
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		{ files: '*.svelte', options: { parser: 'svelte' } },
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
