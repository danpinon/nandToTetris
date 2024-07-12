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

// codeWriter.writePushPop('C_PUSH', 'constant', 10)
// codeWriter.writePushPop('C_POP', 'local', 0)
// codeWriter.writePushPop("C_PUSH", "constant", 21);
// codeWriter.writePushPop("C_PUSH", "constant", 22);
// codeWriter.writePushPop("C_POP", "argument", 1);
// codeWriter.writePushPop("C_POP", "argument", 2);
// codeWriter.writePushPop("C_PUSH", "constant", 36);
// codeWriter.writePushPop("C_POP", "this", 6);
// codeWriter.writePushPop("C_PUSH", "constant", 42);
// codeWriter.writePushPop("C_PUSH", "constant", 45);
// codeWriter.writePushPop("C_POP", "that", 5);
// codeWriter.writePushPop("C_POP", "that", 2);
// codeWriter.writePushPop("C_PUSH", "constant", 510);
// codeWriter.writePushPop("C_POP", "temp", 6);
// codeWriter.writePushPop("C_PUSH", "local", 0);
// codeWriter.writePushPop("C_PUSH", "that", 5);
// codeWriter.writeArithmetic('add');
// codeWriter.writePushPop("C_PUSH", "argument", 1);
// codeWriter.writeArithmetic('sub');
// codeWriter.writePushPop("C_PUSH", "this", 6);
// codeWriter.writePushPop("C_PUSH", "this", 6);
// codeWriter.writeArithmetic('add');
// codeWriter.writeArithmetic('sub');
// codeWriter.writePushPop("C_PUSH", "temp", 6);
// codeWriter.writeArithmetic('add');


// codeWriter.writePushPop("C_PUSH", "constant", 150);
// codeWriter.writePushPop("C_PUSH", "constant", 150);
// codeWriter.writeArithmetic('add');
// codeWriter.writePushPop("C_POP", "static", 0);
// codeWriter.writePushPop("C_PUSH", "static", 0);

