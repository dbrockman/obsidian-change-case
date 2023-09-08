import { Editor, MarkdownView, Plugin } from "obsidian";
import { commands } from "./commands";

export default class ChangeCasePlugin extends Plugin {
	async onload() {
		for (const { id, name, fn } of commands()) {
			this.addCommand({
				id,
				name,
				editorCallback: (editor: Editor, _view: MarkdownView) => {
					const replacement = fn(editor.getSelection());
					if (replacement !== null) {
						editor.replaceSelection(replacement);
					}
				},
			});
		}
	}
}
