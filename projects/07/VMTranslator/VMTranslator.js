import CodeWriter from "./codeWriter.js";
import Parser from "./parser.js";

//input filename.vm
//output filename.asm

/*
Main Logic:

constructs a Parser
constructs a CodeWriter
marches through the input file, parsing each input file and generating asm code from it
*/

const filePath = process.argv[2];

if (!filePath) {
  process.exit(1);
}

const parser = new Parser(filePath);
const codeWriter = new CodeWriter(filePath);

while(await parser.hasMoreLines()) {
  const commandType = parser.commandType();
  const arg1 = parser.arg1();
  const arg2 = parser.arg2();
  if (commandType === "C_ARITHMETIC") {
    codeWriter.writeArithmetic(arg1)
  } else if (commandType === "C_PUSH" || commandType === "C_POP") {
    codeWriter.writePushPop(commandType, arg1, arg2)
  }
  await parser.advance();
}
codeWriter.close();

