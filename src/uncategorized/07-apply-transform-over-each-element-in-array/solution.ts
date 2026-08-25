function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = fn(arr[i], i);
  }
  return result;
}
