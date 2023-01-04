import path from 'path'

export function toBinary(decimal) {
  let divided = decimal;
  let binary = [];
  while (divided > 0) {
    const division = Math.floor(divided / 2);
    const bit = divided - division * 2;
    divided = division;
    binary.unshift(bit);
  }
  return binary.join("");
}

export function bitify({ binary, bits }) {
  const strBinary = binary.toString();
  const nBinary = bits - strBinary.length;

  const aux = (n, acc) => {
    if (n === 0) {
      return acc;
    }
    return aux(n - 1, "0" + acc)
  }
  return aux(nBinary, strBinary);
}

export const inputArg = process.argv[2];

export const pathInput = process.cwd() + "/" + inputArg;

export const fileOutputName = path.basename(inputArg).replace('.asm', '.hack');