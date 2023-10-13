declare module "change-case" {
	interface Options {
		locale?: string[] | string | false;
		separateNumbers?: boolean;
	}

	export type Case = (input: string, options?: Options) => string;

	export const camelCase: Case;
	export const capitalCase: Case;
	export const constantCase: Case;
	export const dotCase: Case;
	export const kebabCase: Case;
	export const noCase: Case;
	export const pascalCase: Case;
	export const pascalSnakeCase: Case;
	export const pathCase: Case;
	export const sentenceCase: Case;
	export const snakeCase: Case;
	export const trainCase: Case;
}
