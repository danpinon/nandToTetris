import fs from "fs";
import readline from "readline";

export default class Parser {
  constructor(filePath) {
    this.fileStream = this.createIterableFileStream(filePath);
    this.currentInstruction = '';
  }

  async *createIterableFileStream(filePath) {
    try {
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        yield line;
      }

      return rl;
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  }

  async hasMoreLines() {
    return this.currentInstruction !== null
  }

  async advance() {
    const { value, done } = await this.fileStream.next();
    if(done) {
      this.currentInstruction = null
      return ''
    }
    const isCommand = value && value[0] !== "/";
    if (!isCommand) {
      this.currentInstruction = '';
      return '';
    }
    this.currentInstruction = value;
    return value;
  }

  commandType() {
    const C_ARITHMETIC = "C_ARITHMETIC";
    const C_PUSH = "C_PUSH";
    const C_POP = "C_POP";
    const C_LABEL = "C_LABEL";
    const C_GOTO = "C_GOTO";
    const C_IF = "C_IF";
    const C_FUNCTION = "C_FUNCTION";
    const C_RETURN = "C_RETURN";
    const C_CALL = "C_CALL";

    const [command] = this.parseInstruction(this.currentInstruction);
    const arithmeticCommands = [
      "add",
      "sub",
      "neg",
      "eq",
      "gt",
      "lt",
      "and",
      "or",
      "not",
    ];
    if (command === "push") return C_PUSH;
    else if (command === "pop") return C_POP;
    else if (arithmeticCommands.includes(command)) return C_ARITHMETIC;
    return;
  }

  arg1() {
    const C_ARITHMETIC = "C_ARITHMETIC";
    const C_RETURN = "C_RETURN";

    const [command, segment] = this.parseInstruction(this.currentInstruction);

    if (this.commandType(command) === C_RETURN) return;
    else if (this.commandType(command) === C_ARITHMETIC) return command;
    else if (segment) return segment;
    return;
  }

  arg2() {
    const C_PUSH = "C_PUSH";
    const C_POP = "C_POP";
    const C_FUNCTION = "C_FUNCTION";
    const C_CALL = "C_CALL";

    const [command, _, index] = this.parseInstruction(this.currentInstruction);
    const validCommands = [C_PUSH, C_POP, C_FUNCTION, C_CALL];

    const isValidCommand = validCommands.includes(this.commandType(command))
    if (!isValidCommand) {
      return;
    }
    return index;
  }

  parseInstruction(instruction) {
    return instruction.split(" ");
  }
}
