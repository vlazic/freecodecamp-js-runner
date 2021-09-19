#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// read file to_test.txt synchronously
const to_test = fs.readFileSync(path.join(__dirname, "to_test.txt"), "utf8");
const regex =
  /^.*?\((?<parameters>.*?)\) should return (?<return_value>.*?)\.$/gm;
let m;
const tests = [];

while ((m = regex.exec(to_test)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  let [, parameters, return_value] = m;

  tests.push({ parameters, return_value });
}

function testLine({ parameters, return_value }) {
  if (return_value === "a number") {
    return `expect(typeof func(${parameters})).toStrictEqual('number');`;
  }
  if (return_value === "a string") {
    return `expect(typeof func(${parameters})).toStrictEqual('string');`;
  }
  return `expect(func(${parameters})).toStrictEqual(${return_value});`;
}

const test_base = `
import func from './index';

test('Run tests', () => {
  ${tests.map(testLine).join("\n  ")}
});
`;

console.log(test_base);

// test_base write to file src/index.spec.js synchronously
fs.writeFileSync(path.join(__dirname, "src/index.spec.ts"), test_base);
