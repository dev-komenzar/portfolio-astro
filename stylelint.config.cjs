module.exports = {
	plugins: ['stylelint-scss'],
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	rules: {
		'font-family-no-missing-generic-family-keyword': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'selector-pseudo-element-colon-notation': 'double',
	},
	customSyntax: 'postcss-html',
}
