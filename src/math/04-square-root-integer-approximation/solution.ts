/*
 * Gracias SusiProfe por recordarme como se hacia una raíz cuadrada!
 * https://www.youtube.com/@SusiProfe
 */

function findIndexClosestValue(
  needle: number,
  haystack: number[],
  leftIndex: number,
  rightIndex: number,
): number {
  const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

  if (needle == haystack[middleIndex] || leftIndex === rightIndex) {
    return middleIndex;
  }

  if (needle <= haystack[middleIndex]) {
    return findIndexClosestValue(needle, haystack, leftIndex, middleIndex - 1);
  } else {
    return findIndexClosestValue(needle, haystack, middleIndex + 1, rightIndex);
  }
}
export function splitPairs(num: string): number[] {
  const pairs: number[] = [];
  for (let i = num.length - 1; i >= 0; i -= 2) {
    if (i >= 1) {
      const pair: string = num[i - 1] + num[i];
      pairs.unshift(Number(pair));
    } else {
      pairs.unshift(Number(num[0]));
    }
  }
  return pairs;
}

export function mySqrt(numberToSqrt: number): number {
  if (numberToSqrt < 0) {
    throw new Error('Input must be a non-negative integer.');
  }
  if (numberToSqrt === 0 || numberToSqrt === 1) {
    return numberToSqrt;
  }

  const digitString = numberToSqrt.toString();
  let resultBuilder: string = '';
  let remainder = 0;

  const pairs = splitPairs(digitString);

  for (let i = 0; i < pairs.length; i++) {
    const currentDividend: string = remainder.toString() + String(pairs[i]);
    const double: number = Number(resultBuilder) * 2;
    const haystack: number[] = [];
    for (let j = 1; j <= 9; j++) {
      const candidateProduct = Number(double.toString() + j.toString()) * j;
      haystack.push(candidateProduct);
    }
    let busca: number = findIndexClosestValue(Number(currentDividend), haystack, 0, 8);
    remainder = Number(currentDividend) - haystack[busca];
    busca += 1;
    resultBuilder = resultBuilder.concat(busca.toString());
  }

  return Number(resultBuilder); // Placeholder
}
