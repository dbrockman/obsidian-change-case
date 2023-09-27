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

export interface ChangeCaseCommand {
	id: string;
	name: string;
	fn: (str: string) => string;
}

export const commands = (): ChangeCaseCommand[] =>
	[
		{ id: "lower", fn: lowerCase },
		{ id: "upper", fn: upperCase },
		{ id: "camel", fn: camelCase },
		{ id: "capital", fn: capitalCase },
		{ id: "constant", fn: constantCase },
		{ id: "dot", fn: dotCase },
		{ id: "header", fn: headerCase },
		{ id: "no", fn: noCase },
		{ id: "param", fn: paramCase },
		{ id: "pascal", fn: pascalCase },
		{ id: "path", fn: pathCase },
		{ id: "sentence", fn: sentenceCase },
		{ id: "snake", fn: snakeCase },
	].map(({ id, fn }) => {
		return {
			id,
			name: fn(id + " case"),
			fn,
		};
	});
