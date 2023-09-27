import {
	App,
	Editor,
	EditorPosition,
	EditorSelection,
	FuzzySuggestModal,
	Plugin,
} from "obsidian";
import { ChangeCaseCommand, commands } from "./commands";

function normalizeSelection({
	anchor,
	head,
}: EditorSelection): [from: EditorPosition, to: EditorPosition] {
	if (anchor.line < head.line) {
		return [anchor, head];
	}
	if (anchor.line > head.line) {
		return [head, anchor];
	}
	if (anchor.ch < head.ch) {
		return [anchor, head];
	}
	return [head, anchor];
}

function replaceAllSelections(
	editor: Editor,
	fn: (str: string) => string
): void {
	if (editor.somethingSelected()) {
		editor.transaction({
			changes: editor.listSelections().map((selection) => {
				const [from, to] = normalizeSelection(selection);
				const str = editor.getRange(from, to);
				return { from, to, text: fn(str) };
			}),
		});
	}
}

class SelectCaseModal extends FuzzySuggestModal<ChangeCaseCommand> {
	private _editor: Editor;

	constructor(app: App, editor: Editor) {
		super(app);
		this._editor = editor;
	}

	getItems(): ChangeCaseCommand[] {
		return commands;
	}

	getItemText(cmd: ChangeCaseCommand): string {
		return cmd.name;
	}

	onChooseItem(cmd: ChangeCaseCommand) {
		replaceAllSelections(this._editor, cmd.fn);
	}
}

export default class ChangeCasePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "select",
			name: "Select from list",
			icon: "case-sensitive",
			editorCallback: (editor: Editor): void => {
				const modal = new SelectCaseModal(this.app, editor);
				modal.setPlaceholder("Choose a format for the selection");
				modal.open();
			},
		});

		for (const { id, name, fn } of commands) {
			this.addCommand({
				id,
				name,
				icon: "case-sensitive",
				editorCallback: (editor: Editor): void => {
					replaceAllSelections(editor, fn);
				},
			});
		}
	}
}
