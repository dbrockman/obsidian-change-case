let OBSIDIAN_LANG: string | null | undefined;
try {
	OBSIDIAN_LANG = self.localStorage.getItem("language");
} catch {}

export const getLang = (): string | undefined => {
	let lang = OBSIDIAN_LANG;
	try {
		lang ||= self.navigator.language;
	} catch {}
	return lang || undefined;
};
