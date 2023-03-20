export function mergeClassNames(params: string[]): string {
	return params
		.filter((value) => {
			if (value) return value
		})
		.join(' ')
}
