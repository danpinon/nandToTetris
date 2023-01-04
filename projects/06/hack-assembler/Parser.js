import fs from 'fs';
import { toBinary, bitify, fileOutputName } from './utils.js';

export function comp(asm) {
  const instruction = new Array(16);
  instruction.fill(0); //array with fifteen 0;

  instruction[15] = 1; // C instruction
  instruction[14] = 1;
  instruction[13] = 1;
  
  function extractInstructs() {
    let dest = '';
    let comp = '';
    let jmp = '';

    const destIndex = asm.indexOf('=');
    const jmpIndex = asm.indexOf(';');

    const isDest = destIndex >= 0;
    const isJmp = jmpIndex >= 0;
    if (isDest) {
      for (let i = 0; i < destIndex; i++) {
        dest += asm[i];
      }
    }

    if (isJmp) {
      const iLen = asm.length;
      jmp = asm.slice(iLen - 3, iLen);
    }

    const compStart = isDest ? destIndex + 1 : 0;
    const compEnd = isJmp ? jmpIndex : asm.length;
    for (let i = compStart; i < compEnd; i++) {
      comp += asm[i];
    }
    return {
      dest,
      comp,
      jmp,
    }
  }
  const { dest, comp, jmp } = extractInstructs();

  function setDest() {
    if (!dest) return;
    for (let symbol of dest) {
      if (symbol === 'M') instruction[3] = 1;
      if (symbol === 'D') instruction[4] = 1;
      if (symbol === 'A') instruction[5] = 1;
    }
  }
  function setJmp() {
    if (!jmp) return;
    const setJmpBits = (values) => {
      instruction[0] = values[2];
      instruction[1] = values[1];
      instruction[2] = values[0];
    }
    if (jmp === 'JGT') setJmpBits([0,0,1]);
    if (jmp === 'JEQ') setJmpBits([0,1,0]);
    if (jmp === 'JGE') setJmpBits([0,1,1]);
    if (jmp === 'JLT') setJmpBits([1,0,0]);
    if (jmp === 'JNE') setJmpBits([1,0,1]);
    if (jmp === 'JLE') setJmpBits([1,1,0]);
    if (jmp === 'JMP') setJmpBits([1,1,1]);
  }
  function setComp() {
    const aBit = comp.includes('M');
    const reg = aBit ? 'M' : 'A';

    if (aBit) instruction[12] = 1;

    const setJmpBits = (values) => {
      instruction[6] = values[5];
      instruction[7] = values[4];
      instruction[8] = values[3];
      instruction[9] = values[2];
      instruction[10] = values[1];
      instruction[11] = values[0];
    }
    if(comp == 0) setJmpBits([1,0,1,0,1,0]);
    if(comp == 1) setJmpBits([1,1,1,1,1,1]);
    if(comp == -1) setJmpBits([1,1,1,0,1,0]);
    if(comp == 'D') setJmpBits([0,0,1,1,0,0]);
    if(comp == reg) setJmpBits([1,1,0,0,0,0]);
    if(comp == '!D') setJmpBits([0,0,1,1,0,1]);
    if(comp == `!${reg}`) setJmpBits([1,1,0,0,0,1]);
    if(comp == '-D') setJmpBits([1,0,0,1,1,1,1]);
    if(comp == `-${reg}`) setJmpBits([1,1,0,0,1,1]);
    if(comp == 'D+1') setJmpBits([0,1,1,1,1,1]);
    if(comp == `${reg}+1`) setJmpBits([1,1,0,1,1,1]);
    if(comp == 'D-1') setJmpBits([0,0,1,1,1,0]);
    if(comp == `${reg}-1`) setJmpBits([1,1,0,0,1,0]);
    if(comp == `D+${reg}`) setJmpBits([0,0,0,0,1,0]);
    if(comp == `D-${reg}` ) setJmpBits([0,1,0,0,1,1]);
    if(comp == `${reg}-D` ) setJmpBits([0,0,0,1,1,1]);
    if(comp == `D&${reg}` ) setJmpBits([0,0,0,0,0,0]);
    if(comp == `D|${reg}` ) setJmpBits([0,1,0,1,0,1]);
  }
  setDest();
  setJmp();
  setComp();
  return instruction.reverse().join('');
};

export function dest(instruction) {
  const decimal = +instruction.slice(1);
  if(isNaN(decimal)) return;
  const address = bitify({ binary: toBinary(decimal), bits: 16 });

  return address;
};

export function clean(instruction) {
  //removes spaces from each instruction
  const cleanI = instruction.replace(/\s/g, '');

  //removes a line comment
  if (cleanI[0] === '/') return null;

  // removes comments after instruction
  if (cleanI.indexOf('/') >= 0) {
      const lengthInstruction = cleanI.indexOf('/');
      const trimInstruct = cleanI.slice(0, lengthInstruction);
      return trimInstruct;
  }
  
  // removes labels (XXX)
  //if (cleanI[0] === '(') return null;

  // remove empty line
  if (cleanI === '') return null;

  return cleanI;
};

export function normalize(instructions) {
  // separates instructions on break line
  const splitInstructions = instructions.split(/\r?\n/);

  const normalizedInstructions = splitInstructions.reduce((acc, instruction) => {
    const cleanI = clean(instruction);

    if (cleanI) return [...acc, cleanI];
    
    return acc;
  }, [])

  return normalizedInstructions;
}

export function formatContent(instructions) {
  const outputText = instructions.join('\n');
  return outputText;
}

export function writeFile(content) {
  fs.writeFile(`${process.cwd()}/${fileOutputName}`, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}