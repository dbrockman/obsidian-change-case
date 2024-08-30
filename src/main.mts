import {
	App,
	Editor,
	EditorPosition,
	EditorSelection,
	FuzzySuggestModal,
	Plugin,
} from "obsidian";
import { Cmd, CmdFn, CmdId, commands } from "./commands.mjs";
import { getLang } from "./language.mjs";

const normalizeSelection = ({
	anchor,
	head,
}: EditorSelection): [from: EditorPosition, to: EditorPosition] =>
	anchor.line < head.line
		? [anchor, head]
		: anchor.line > head.line
		? [head, anchor]
		: anchor.ch < head.ch
		? [anchor, head]
		: [head, anchor];

// Fix: Preserve line breaks in case formatting
 
const replaceAllSelections = (editor: Editor, fn: CmdFn): void => {
	if (editor.somethingSelected()) {
		const locale = getLang();
		editor.transaction({
			changes: editor.listSelections().map((selection) => {
				const [from, to] = normalizeSelection(selection);
				const str = editor.getRange(from, to).split('\n').map(line => fn(line, { locale })).join('\n');
				return { from, to, text: str };
			}),
		});
	}
};

class SelectCaseModal extends FuzzySuggestModal<Cmd<CmdId>> {
	private _editor: Editor;

	constructor(app: App, editor: Editor) {
		super(app);
		this._editor = editor;
	}

	getItems(): Cmd<CmdId>[] {
		return commands;
	}

	getItemText(cmd: Cmd<CmdId>): string {
		return cmd.name;
	}

	onChooseItem(cmd: Cmd<CmdId>): void {
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
