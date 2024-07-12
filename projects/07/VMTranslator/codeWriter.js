import fs from "fs";
import path from "path";
import { exec } from "child_process";

export default class CodeWriter {
  constructor(filePath) {
    this.file = path.parse(filePath);
    this.writerStream = fs.createWriteStream(`${this.file.name}.asm`);
    this.segments = {
      local: "LCL",
      argument: "ARG",
      this: "THIS",
      that: "THAT",
      constant: 0,
      temp: 5,
    };
  }

  getId() {
    return this.writerStream.writableLength;
  }

  writeArithmetic(command) {
    //writes to the output file the assembly the aritmetic and logical commands
    let asm;
    if (command === "add") {
      asm = this._addInstruction();
    } else if (command === "sub") {
      asm = this._subInstruction();
    } else if (command === "eq") {
      asm = this._eqInstruction();
    } else if (command === "gt") {
      asm = this._gtInstruction();
    } else if (command === "lt") {
      asm = this._ltInstruction();
    } else if (command === "neg") {
      asm = this._negInstruction();
    } else if (command === "and") {
      asm = this._andInstruction();
    } else if (command === "or") {
      asm = this._orInstruction();
    } else if (command === "not") {
      asm = this._notInstruction();
    } else {
      return;
    }
    this.writerStream.write(asm);
  }

  writePushPop(command, segment, index) {
    //writes to the output file the assembly the push/pop commands
    let asm;

    if (command === "C_PUSH") {
      asm = this.getPush(segment, Number(index));
    } else if (command === "C_POP") {
      asm = this.getPop(segment, Number(index));
    } else return;
    this.writerStream.write(asm);
  }

  getPush(segment, index) {
    let asm = '';
    if (segment === 'constant') {
      asm = this._pushInstructionTemplate("constant", index, false);
    } else if (segment === 'local') {
      asm = this._pushInstructionTemplate("LCL", index, false);
    } else if (segment === 'argument') {
      asm = this._pushInstructionTemplate("ARG", index, false);
    } else if (segment === 'this') {
      asm = this._pushInstructionTemplate("THIS", index, false);
    } else if (segment === 'that') {
      asm = this._pushInstructionTemplate("THAT", index, false);
    } else if (segment === 'temp') {
      asm = this._pushInstructionTemplate("R5", index + 5, false);
    } else if (segment === 'pointer' && index === 0) {
      asm = this._pushInstructionTemplate('THIS', index, true);
    } else if (segment === 'pointer' && index === 1) {
      asm = this._pushInstructionTemplate('THAT', index, true);
    } else if (segment === 'static') {
      asm = this._pushInstructionTemplate(`static.${index}`, index, true);
    }
    return asm;
  }

  _pushInstructionTemplate(segment, index, isDirect) {
    if (segment === "constant") {
      return `
      // push constant ${index}
      @${index} // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      `;
    }

    const noPointerCode = isDirect ? 
    '' : 
    `@${index}\nA=D+A\nD=M\n`;

    return `
    // push ${segment} ${index}
    @${segment}
    D=M
    ${noPointerCode}
    @SP
    A=M
    M=D
    @SP
    M=M+1
    `;
  }

  getPop(segment, index) {
    let asm = ''
    if (segment === 'local') {
      asm = this._popInstructionTemplate("LCL", index, false);
    } else if (segment === 'argument') {
      asm = this._popInstructionTemplate("ARG", index, false);
    } else if (segment === 'this') {
      asm = this._popInstructionTemplate("THIS", index, false);
    } else if (segment === 'that') {
      asm = this._popInstructionTemplate("THAT", index, false);
    } else if (segment === 'temp') {
      asm = this._popInstructionTemplate("R5", index + 5, false);
    } else if (segment === 'pointer' && index === 0) {
      asm = this._popInstructionTemplate('THIS', index, true);
    } else if (segment === 'pointer' && index === 1) {
      asm = this._popInstructionTemplate('THAT', index, true);
    } else if (segment === 'static') {
      asm = this._popInstructionTemplate(`static.${index}`, index, true);
    }
    return asm;
  }

  _popInstructionTemplate(segment, index, isDirect) {
    if (segment === "constant") return;
    
    const noPointerCode = isDirect ? 
    `D=A\n`
    : 
    `D=M\n@${index}\nD=D+A\n`;

    return `
    // pop ${segment} ${index}
    @${segment}
    ${noPointerCode}
    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    `
  }

  _addInstruction() {
    return `
    // add
    @SP //SP--
    M=M-1

    @SP // D=RAM[256]
    A=M // address=256
    D=M //D=RAM[256]

    A=A-1 //256-1
    D=D+M //D=RAM[256]+RAM[255]

    M=D //RAM[255]=D
    `;
  }

  _subInstruction() {
    return `
    // sub
    @SP
    AM=M-1
    D=M
    A=A-1
    M=M-D
    `;
  }

  _negInstruction() {
    return `
    // neg
    @SP
    A=M // 256
    A=A-1 //256-1
    M=-M //neg
    `;
  }

  _eqInstruction() {
    return this.getConditionalInstruction("eq");
  }

  _gtInstruction() {
    return this.getConditionalInstruction("gt");
  }

  _ltInstruction() {
    return this.getConditionalInstruction("lt");
  }

  getConditionalInstruction(command) {
    const id = this.getId();
    let asm;
    let comment;
    if (command === "eq") {
      asm = "JEQ";
      comment = `If D == 0 (values are equal), jump to TRUE.${id}`;
    } else if (command === "gt") {
      asm = "JGT";
      comment = `If D > 0 (values is mayor), jump to TRUE.${id}`;
    } else if (command === "lt") {
      asm = "JLT";
      comment = `If D < 0 (value is minor), jump to TRUE.${id}`;
    } else return;

    return `
    // eq
    @SP
    AM=M-1      // Decrement SP and load SP into A, then M=A; SP--
    D=M         // D = *SP (topmost value)
    @SP
    AM=M-1      // Decrement SP and load SP into A, then M=A; SP--
    D=D-M       // D = second topmost value - topmost value
    @TRUE.${id}    // Unique label EQUAL.${id}
    D;${asm}       // ${comment}
    @SP
    A=M
    M=0         // Set *SP to false (0)
    @END.${id}      // Unique label END.${id}
    0;JMP       // Unconditionally jump to END.${id}

    (TRUE.${id})
    @SP
    A=M
    M=-1        // Set *SP to true (-1)

    (END.${id})
    @SP
    M=M+1       // SP++
    `;
  }

  _andInstruction() {
    return `
    @SP // decrement stack pointer
    AM=M-1

    D=M // get the first operand

    @SP
    A=M-1 // decrese the address of SP to get the second operand
    D=D&M // AND operation

    M=D // add the result back to the stack
    `;
  }

  _notInstruction() {
    return `
    @SP // decrement stack pointer
    A=M-1

    D=M // get the operand and negate it

    M=!D // add the result back to the stack
    `;
  }

  _orInstruction() {
    return `
    @SP // decrement stack pointer
    AM=M-1

    D=M // get the first operand

    @SP
    A=M-1 // decrese the address of SP to get the second operand
    D=D|M // OR operation

    M=D // add the result back to the stack
    `;
  }

  close() {
    this.writerStream.close();
  }
}
