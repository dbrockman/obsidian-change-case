import { strict as assert } from "node:assert";
import test from "node:test";
import { Cmd, CmdId, commands } from "../src/commands.mjs";

const commands_map = new Map<CmdId, Cmd<CmdId>>(
	commands.map((cmd) => [cmd.id, cmd])
);

const tested_command_ids = new Set<CmdId>();

function getCommand(id: CmdId): Cmd<CmdId> {
	const cmd = commands_map.get(id);
	assert(cmd, `command ${id} not found`);
	return cmd;
}

function trackId(id: CmdId): void {
	assert(!tested_command_ids.has(id), `command ${id} already tested`);
	tested_command_ids.add(id);
}

test("lower case", () => {
	const { id, name, fn } = getCommand("lower");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "lower case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "test string");
	assert.strictEqual(fn("Test String", { locale }), "test string");
	assert.strictEqual(fn("TestString", { locale }), "teststring");
});

test("upper case", () => {
	const { id, name, fn } = getCommand("upper");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "UPPER CASE");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "TEST STRING");
	assert.strictEqual(fn("TEST STRING", { locale }), "TEST STRING");
	assert.strictEqual(fn("TestString", { locale }), "TESTSTRING");
});

test("camel case", () => {
	const { id, name, fn } = getCommand("camel");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "camelCase");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "testString");
	assert.strictEqual(fn("TEST STRING", { locale }), "testString");
	assert.strictEqual(fn("testString", { locale }), "testString");
});

test("capital case", () => {
	const { id, name, fn } = getCommand("capital");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "Capital Case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "Test String");
	assert.strictEqual(fn("test_string", { locale }), "Test String");
	assert.strictEqual(fn("testString", { locale }), "Test String");
	assert.strictEqual(fn("Test String", { locale }), "Test String");
});

test("constant case", () => {
	const { id, name, fn } = getCommand("constant");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "CONSTANT_CASE");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "TEST_STRING");
	assert.strictEqual(fn("test_string", { locale }), "TEST_STRING");
	assert.strictEqual(fn("testString", { locale }), "TEST_STRING");
	assert.strictEqual(fn("TEST_STRING", { locale }), "TEST_STRING");
});

test("dot case", () => {
	const { id, name, fn } = getCommand("dot");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "dot.case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "test.string");
	assert.strictEqual(fn("TEST.STRING", { locale }), "test.string");
	assert.strictEqual(fn("testString", { locale }), "test.string");
	assert.strictEqual(fn("test.string", { locale }), "test.string");
});

test("kebab case", () => {
	const { id, name, fn } = getCommand("kebab");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "kebab-case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test-string", { locale }), "test-string");
	assert.strictEqual(fn("testString", { locale }), "test-string");
	assert.strictEqual(fn("TEST STRING", { locale }), "test-string");
	assert.strictEqual(fn("test_string", { locale }), "test-string");
});

test("no case", () => {
	const { id, name, fn } = getCommand("no");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "no case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "test string");
	assert.strictEqual(fn("testString", { locale }), "test string");
	assert.strictEqual(fn("TEST STRING", { locale }), "test string");
	assert.strictEqual(fn("test_string", { locale }), "test string");
});

test("pascal case", () => {
	const { id, name, fn } = getCommand("pascal");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "PascalCase");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("TestString", { locale }), "TestString");
	assert.strictEqual(fn("testString", { locale }), "TestString");
	assert.strictEqual(fn("TEST STRING", { locale }), "TestString");
	assert.strictEqual(fn("test_string", { locale }), "TestString");
});

test("pascal snake case", () => {
	const { id, name, fn } = getCommand("pascalSnake");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "Pascal_Snake_Case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test string", { locale }), "Test_String");
	assert.strictEqual(fn("test-string", { locale }), "Test_String");
	assert.strictEqual(fn("testString", { locale }), "Test_String");
	assert.strictEqual(fn("Test_String", { locale }), "Test_String");
});

test("path case", () => {
	const { id, name, fn } = getCommand("path");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "path/case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test/string", { locale }), "test/string");
	assert.strictEqual(fn("testString", { locale }), "test/string");
	assert.strictEqual(fn("TEST STRING", { locale }), "test/string");
	assert.strictEqual(fn("test_string", { locale }), "test/string");
});

test("sentence case", () => {
	const { id, name, fn } = getCommand("sentence");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "Sentence case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("Test string", { locale }), "Test string");
	assert.strictEqual(fn("testString", { locale }), "Test string");
	assert.strictEqual(fn("TEST STRING", { locale }), "Test string");
	assert.strictEqual(fn("test_string", { locale }), "Test string");
});

test("snake case", () => {
	const { id, name, fn } = getCommand("snake");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "snake_case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test_string", { locale }), "test_string");
	assert.strictEqual(fn("testString", { locale }), "test_string");
	assert.strictEqual(fn("TEST STRING", { locale }), "test_string");
	assert.strictEqual(fn("test-string", { locale }), "test_string");
});

test("train case", () => {
	const { id, name, fn } = getCommand("train");
	const locale = "en-US";
	trackId(id);
	assert.strictEqual(name, "Train-Case");
	assert.strictEqual(fn("", { locale }), "");
	assert.strictEqual(fn("test_string", { locale }), "Test-String");
	assert.strictEqual(fn("testString", { locale }), "Test-String");
	assert.strictEqual(fn("TEST STRING", { locale }), "Test-String");
	assert.strictEqual(fn("test-string", { locale }), "Test-String");
});

test("all commands have been tested", () => {
	for (const id of commands_map.keys()) {
		assert(tested_command_ids.has(id), `command ${id} has not been tested`);
	}
});
