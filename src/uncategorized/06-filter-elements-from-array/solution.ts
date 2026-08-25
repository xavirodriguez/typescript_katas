export type Fn = (n: number, i?: number) => boolean;

export function filter(arr: number[], fn: Fn): number[] {
  let filtered = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      filtered.push(arr[i]);
    }
  }
  return filtered;
}
