module.exports = {
	plugins: ['stylelint-scss', 'stylelint-prettier'],
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	rules: {
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
				],
			},
		],
		'font-family-no-missing-generic-family-keyword': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'selector-pseudo-element-colon-notation': 'double',
		'prettier/prettier': true,
	},
	customSyntax: 'postcss-html',
	ignoreFiles: ['**/*.json'],
}
