import { lowerCase } from "lower-case";
import { upperCase } from "upper-case";
import {
	camelCase,
	capitalCase,
	constantCase,
	dotCase,
	headerCase,
	noCase,
	paramCase,
	pascalCase,
	pathCase,
	sentenceCase,
	snakeCase,
} from "change-case";
import { splitTrim } from "./split-trim";

const transform = (str: string, fn: (str: string) => string): string | null => {
	const [leading_whitespace, s1, trailing_whitespace] = splitTrim(str);
	const s2 = s1 && fn(s1);
	return s2 !== s1 ? leading_whitespace + s2 + trailing_whitespace : null;
};

export interface ChangeCaseCommand {
	id: string;
	name: string;
	fn: (str: string) => string | null;
}

export const commands = (): ChangeCaseCommand[] =>
	[
		{ name: "lower", fn: lowerCase },
		{ name: "upper", fn: upperCase },
		{ name: "camel", fn: camelCase },
		{ name: "capital", fn: capitalCase },
		{ name: "constant", fn: constantCase },
		{ name: "dot", fn: dotCase },
		{ name: "header", fn: headerCase },
		{ name: "no", fn: noCase },
		{ name: "param", fn: paramCase },
		{ name: "pascal", fn: pascalCase },
		{ name: "path", fn: pathCase },
		{ name: "sentence", fn: sentenceCase },
		{ name: "snake", fn: snakeCase },
	].map(({ name, fn }) => ({
		id: "change-case-" + name,
		name: fn(name + " case"),
		fn: (str: string) => transform(str, fn),
	}));
