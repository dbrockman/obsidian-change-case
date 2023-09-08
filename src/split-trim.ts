/**
 * Splits a string into three parts: leading whitespace, non-whitespace, and trailing whitespace.
 * Always returns a tuple of three strings.
 * If the string contains only whitespace, the whole string is returned as the first value in the tuple.
 */
export const splitTrim = (str: string): [string, string, string] => {
	const i = str.search(/\S/);
	if (i === -1) {
		return [str, "", ""];
	}
	const j = str.search(/\S\s*$/) + 1;
	return [str.slice(0, i), str.slice(i, j), str.slice(j)];
};
