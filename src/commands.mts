import {
	Case,
	camelCase,
	capitalCase,
	constantCase,
	dotCase,
	kebabCase,
	noCase,
	pascalCase,
	pascalSnakeCase,
	pathCase,
	sentenceCase,
	snakeCase,
	trainCase,
} from "change-case";

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
	wrap("capital", capitalCase),
	wrap("constant", constantCase),
	wrap("dot", dotCase),
	wrap("kebab", kebabCase),
	wrap("no", noCase),
	wrap("pascal", pascalCase),
	wrap("pascalSnake", pascalSnakeCase),
	wrap("path", pathCase),
	wrap("sentence", sentenceCase),
	wrap("snake", snakeCase),
	wrap("train", trainCase),
];

export type CmdId = (typeof commands)[number]["id"];
