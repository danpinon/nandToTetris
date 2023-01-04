#!/usr/bin/env node

import fs from 'fs';

import { pathInput, fileOutputName } from './utils.js';
import * as parser from './Parser.js';
import * as code from './Code.js';

const readFile = fs.readFileSync(pathInput, 'utf-8')

const fileInstructions = parser.normalize(readFile);
const setSymbol = code.symbolToAddress();
const setLabel = code.setLabel();

function firstPass () {
  const output = fileInstructions.reduce((acc, instruction) => {
    setLabel(instruction);

    if (!code.removeLabel(instruction)) return acc;

    return [...acc, instruction];
  }, [])

  return output;
}

const cleanedLabels = firstPass();

function main() {
  const output = cleanedLabels.map((instruction, ix) => {
    if(ix == 101) {
      console.log(instruction)
      console.log(parser.comp(instruction))
    }
    if (instruction[0] === '@') {
      const parseDest = parser.dest(instruction);
      if (!parseDest) {
        return parser.dest(setSymbol(instruction));
      }
      return parser.dest(instruction)
    };
    return parser.comp(instruction)
  })
  const outputContent = parser.formatContent(output);
  parser.writeFile(outputContent);
  console.log(`${fileOutputName} exported`)
  return outputContent;
}

main();
