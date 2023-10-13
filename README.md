# Change Case Obsidian Plugin

Plugin to let you change the case of the selected text.

This is a plugin for Obsidian (https://obsidian.md). Search for "Change Case" in the community plugins.

This plugin adds the commands:

```
Change Case: lower case
Change Case: UPPER CASE
Change Case: camelCase
Change Case: Capital Case
Change Case: CONSTANT_CASE
Change Case: dot.case
Change Case: kebab-case
Change Case: no case
Change Case: PascalCase
Change Case: Pascal_Snake_Case
Change Case: path/case
Change Case: Sentence case
Change Case: snake_case
Change Case: Train-Case

Change Case: Select from list
```

The `Select from list` command will show a selection modal with the other commands.

## Multiple selections

These commands can be used with multiple selections. All changes are committed to the editor in a single transaction. That means that when you _undo_, all changes will be undone. Any change to the length of the strings will be handled correctly and will not interfere with the next selection.

## Handling of non-Latin alphabets

Changes to lower and upper case are done according to locale-specific case mappings, using `toLocaleLowerCase` and `toLocaleUpperCase`.

The locale is picked up from the Obsidian settings and `navigator.language` is used as a fallback.

The Unicode category for each letter is used to determine if the letter is a lowercase letter that has an uppercase variant, or an uppercase letter that has a lowercase variant.

When letters are made up of multiple Unicode characters (grapheme clusters), this plugin will try to group them into single characters if possible. For example, `à` encoded as `U+0061 U+0300` will be encoded as the Unicode character `U+00E0`. Apart from that, it will not attempt to keep grapheme clusters intact, so some modifiers and marks such as accents and umlauts might get stripped from the text.

## Handling of Markdown formatting

There is no special handling of Markdown markup characters or other formatting such as parentheses.

If you select text with formatting and use the `camelCase` command, for example, the formatting will be stripped:

```diff
- ### example - **formatted** (text)
+ exampleFormattedText
```

The exception is the `lower case` and `UPPER CASE` commands because they simply call `toLocaleLowerCase` and `toLocaleUpperCase` so all formatting remains intact.
