export function generate(numRows: number): number[][] {
  const output: number[][] = [];
  for (let i = 1; i <= numRows; i++) {
    const row: number[] = new Array(i);
    row[0] = 1;
    row[i - 1] = 1;
    for (let j = 1; j < i - 1; j++) {
      row[j] = output[i - 2][j - 1] + output[i - 2][j];
    }
    output.push(row);
  }

  return output;
}
