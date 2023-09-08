import { strict as assert } from "node:assert";
import test from "node:test";
import { splitTrim } from "../src/split-trim";

test("splitTrim", () => {
	assert.deepStrictEqual(splitTrim(""), ["", "", ""], "empty string");
	assert.deepStrictEqual(splitTrim(" "), [" ", "", ""], "single space");
	assert.deepStrictEqual(
		splitTrim(" \n \t \n "),
		[" \n \t \n ", "", ""],
		"whitespace"
	);
	assert.deepStrictEqual(
		splitTrim("test string"),
		["", "test string", ""],
		"no whitespace"
	);
	assert.deepStrictEqual(
		splitTrim(" test string"),
		[" ", "test string", ""],
		"one leading whitespace"
	);
	assert.deepStrictEqual(
		splitTrim("   test string"),
		["   ", "test string", ""],
		"multiple leading whitespace"
	);
	assert.deepStrictEqual(
		splitTrim("test string "),
		["", "test string", " "],
		"one trailing whitespace"
	);
	assert.deepStrictEqual(
		splitTrim("test string   "),
		["", "test string", "   "],
		"multiple trailing whitespace"
	);
	assert.deepStrictEqual(
		splitTrim(" \n \n \t test string \t \n \n "),
		[" \n \n \t ", "test string", " \t \n \n "],
		"leading and trailing whitespace"
	);
});
