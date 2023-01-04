import { variableSymbolsTable, labelSymbolsTable } from "./SymbolTable.js";

export function symbolToAddress() {
  let nAddress = variableSymbolsTable.R15;
  
  return (symbol) => {
    const variable = symbol.slice(1);
    
    if (labelSymbolsTable[variable]) {
      return `@${labelSymbolsTable[variable]}`
    };

    if(variableSymbolsTable[variable] == undefined) {
      nAddress = nAddress + 1;
      variableSymbolsTable[variable] = nAddress;
    }
    return `@${variableSymbolsTable[variable]}`
  }
};

export function setLabel() {
  let gotoLine = 0;

  return (instruction) => {
    
    if (instruction[0] === '(') {
      const label = instruction.slice(1, instruction.length - 1)
      labelSymbolsTable[label] = gotoLine;
    } else {
      gotoLine = gotoLine + 1;
    }
  }
}

export function removeLabel(instruction) {
  if (instruction[0] === '(') return null;
  return instruction;
}