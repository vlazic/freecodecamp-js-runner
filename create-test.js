#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// read file to_test.txt synchronously
const to_test = fs.readFileSync(path.join(__dirname, "to_test.txt"), "utf8");
const regex =
  /^.*?\((?<parameters>.*?)\) should return (?<return_value>.*?)\.?$/gm;
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

function testDefinition({ parameters, return_value }, index) {
  let line;
  switch (return_value) {
    case "a number":
      line = `expect(typeof func(${parameters})).toStrictEqual('number');`;
      break;

    case "a string":
      line = `expect(typeof func(${parameters})).toStrictEqual('number');`;
      break;

    default:
      line = `expect(func(${parameters})).toStrictEqual(${return_value});`;
  }

  return `
test('TEST #${
    index + 1
  } | PARAMETERS ${parameters} | RETURN ${return_value}', () => {
  ${line};
});`;
}

const test_base = `
import func from './index';

${tests.map(testDefinition).join("\n  ")}
`;

console.log(test_base);

// test_base write to file src/index.spec.js synchronously
fs.writeFileSync(path.join(__dirname, "src/index.spec.ts"), test_base);
