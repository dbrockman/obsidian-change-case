import { Editor, MarkdownView, Plugin } from "obsidian";
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

export default class ChangeCasePlugin extends Plugin {
	async onload() {
		for (const fn of [
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
		]) {
			this.addCommand({
				id: `change-case-to-${paramCase(fn.name)}`,
				name: `Change Case: ${noCase(fn.name)}`,
				editorCallback: (editor: Editor, _view: MarkdownView) => {
					const selectedText = editor.getSelection();
					if (selectedText) {
						editor.replaceSelection(fn(selectedText));
					}
				},
			});
		}
	}
}
