import {
	Case,
	camelCase,
	constantCase,
	dotCase,
	kebabCase,
	noCase,
	pascalCase,
	pascalSnakeCase,
	pathCase,
	snakeCase,
	trainCase,
} from "change-case";

// Matches a word: a letter/digit followed by more letters/digits/apostrophes.
// Apostrophes (ASCII and Unicode curly) are kept as part of the word.
const WORD_RE = /[\p{L}\d][\p{L}\d'\u2019]*/gu;

// Prose-aware sentence case: uppercase first word, lowercase the rest,
// preserving all punctuation and whitespace in place.
const proseSentenceCase: Case = (input, options) => {
	const locale = options?.locale || undefined;
	let first = true;
	return input.replace(WORD_RE, (word) => {
		if (first) {
			first = false;
			return (
				word.charAt(0).toLocaleUpperCase(locale) +
				word.slice(1).toLocaleLowerCase(locale)
			);
		}
		return word.toLocaleLowerCase(locale);
	});
};

// Prose-aware capital case: uppercase first letter of every word,
// preserving all punctuation and whitespace in place.
const proseCapitalCase: Case = (input, options) => {
	const locale = options?.locale || undefined;
	return input.replace(
		WORD_RE,
		(word) =>
			word.charAt(0).toLocaleUpperCase(locale) +
			word.slice(1).toLocaleLowerCase(locale),
	);
};

export type CmdFn = (str: string, options?: { locale?: string }) => string;

export interface Cmd<ID extends string> {
	id: ID;
	name: string;
	fn: Case;
}

const wrap = <const ID extends string>(id: ID, fn: Case): Cmd<ID> => ({
	id,
	name: fn(id + " case", { locale: false }),
	fn,
});

export const commands = [
	wrap("lower", (s, o) => s.toLocaleLowerCase(o?.locale || undefined)),
	wrap("upper", (s, o) => s.toLocaleUpperCase(o?.locale || undefined)),
	wrap("camel", camelCase),
	wrap("capital", proseCapitalCase),
	wrap("constant", constantCase),
	wrap("dot", dotCase),
	wrap("kebab", kebabCase),
	wrap("no", noCase),
	wrap("pascal", pascalCase),
	wrap("pascalSnake", pascalSnakeCase),
	wrap("path", pathCase),
	wrap("sentence", proseSentenceCase),
	wrap("snake", snakeCase),
	wrap("train", trainCase),
];

export type CmdId = (typeof commands)[number]["id"];
