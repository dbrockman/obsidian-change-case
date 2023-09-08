import { strict as assert } from "node:assert";
import test from "node:test";
import { ChangeCaseCommand, commands } from "../src/commands";

const commands_map = new Map<string, ChangeCaseCommand>(
	commands().map((cmd) => [cmd.id, cmd])
);

const tested_command_ids = new Set<string>();

function getCommand(id: string): ChangeCaseCommand {
	const cmd = commands_map.get(id);
	assert(cmd, `command ${id} not found`);
	return cmd;
}

function trackId(id: string): void {
	assert(!tested_command_ids.has(id), `command ${id} already tested`);
	tested_command_ids.add(id);
}

test("lower case", () => {
	const { id, name, fn } = getCommand("change-case-lower");
	trackId(id);
	assert.strictEqual(name, "lower case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), null);
	assert.strictEqual(fn("Test String"), "test string");
	assert.strictEqual(fn("TestString"), "teststring");
});

test("upper case", () => {
	const { id, name, fn } = getCommand("change-case-upper");
	trackId(id);
	assert.strictEqual(name, "UPPER CASE");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "TEST STRING");
	assert.strictEqual(fn("TEST STRING"), null);
	assert.strictEqual(fn("TestString"), "TESTSTRING");
});

test("camel case", () => {
	const { id, name, fn } = getCommand("change-case-camel");
	trackId(id);
	assert.strictEqual(name, "camelCase");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "testString");
	assert.strictEqual(fn("TEST STRING"), "testString");
	assert.strictEqual(fn("testString"), null);
});

test("capital case", () => {
	const { id, name, fn } = getCommand("change-case-capital");
	trackId(id);
	assert.strictEqual(name, "Capital Case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "Test String");
	assert.strictEqual(fn("test_string"), "Test String");
	assert.strictEqual(fn("testString"), "Test String");
	assert.strictEqual(fn("Test String"), null);
});

test("constant case", () => {
	const { id, name, fn } = getCommand("change-case-constant");
	trackId(id);
	assert.strictEqual(name, "CONSTANT_CASE");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "TEST_STRING");
	assert.strictEqual(fn("test_string"), "TEST_STRING");
	assert.strictEqual(fn("testString"), "TEST_STRING");
	assert.strictEqual(fn("TEST_STRING"), null);
});

test("dot case", () => {
	const { id, name, fn } = getCommand("change-case-dot");
	trackId(id);
	assert.strictEqual(name, "dot.case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "test.string");
	assert.strictEqual(fn("TEST.STRING"), "test.string");
	assert.strictEqual(fn("testString"), "test.string");
	assert.strictEqual(fn("test.string"), null);
});

test("header case", () => {
	const { id, name, fn } = getCommand("change-case-header");
	trackId(id);
	assert.strictEqual(name, "Header-Case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), "Test-String");
	assert.strictEqual(fn("test_string"), "Test-String");
	assert.strictEqual(fn("testString"), "Test-String");
	assert.strictEqual(fn("Test-String"), null);
});

test("no case", () => {
	const { id, name, fn } = getCommand("change-case-no");
	trackId(id);
	assert.strictEqual(name, "no case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test string"), null);
	assert.strictEqual(fn("testString"), "test string");
	assert.strictEqual(fn("TEST STRING"), "test string");
	assert.strictEqual(fn("test_string"), "test string");
});

test("param case", () => {
	const { id, name, fn } = getCommand("change-case-param");
	trackId(id);
	assert.strictEqual(name, "param-case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test-string"), null);
	assert.strictEqual(fn("testString"), "test-string");
	assert.strictEqual(fn("TEST STRING"), "test-string");
	assert.strictEqual(fn("test_string"), "test-string");
});

test("pascal case", () => {
	const { id, name, fn } = getCommand("change-case-pascal");
	trackId(id);
	assert.strictEqual(name, "PascalCase");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("TestString"), null);
	assert.strictEqual(fn("testString"), "TestString");
	assert.strictEqual(fn("TEST STRING"), "TestString");
	assert.strictEqual(fn("test_string"), "TestString");
});

test("path case", () => {
	const { id, name, fn } = getCommand("change-case-path");
	trackId(id);
	assert.strictEqual(name, "path/case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test/string"), null);
	assert.strictEqual(fn("testString"), "test/string");
	assert.strictEqual(fn("TEST STRING"), "test/string");
	assert.strictEqual(fn("test_string"), "test/string");
});

test("sentence case", () => {
	const { id, name, fn } = getCommand("change-case-sentence");
	trackId(id);
	assert.strictEqual(name, "Sentence case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("Test string"), null);
	assert.strictEqual(fn("testString"), "Test string");
	assert.strictEqual(fn("TEST STRING"), "Test string");
	assert.strictEqual(fn("test_string"), "Test string");
});

test("snake case", () => {
	const { id, name, fn } = getCommand("change-case-snake");
	trackId(id);
	assert.strictEqual(name, "snake_case");
	assert.strictEqual(fn(""), null);
	assert.strictEqual(fn("test_string"), null);
	assert.strictEqual(fn("testString"), "test_string");
	assert.strictEqual(fn("TEST STRING"), "test_string");
	assert.strictEqual(fn("test-string"), "test_string");
});

test("all commands have been tested", () => {
	for (const id of commands_map.keys()) {
		assert(tested_command_ids.has(id), `command ${id} has not been tested`);
	}
});
