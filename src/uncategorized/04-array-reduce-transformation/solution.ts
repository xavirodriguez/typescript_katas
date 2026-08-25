export type Fn = (accum: number, curr: number) => number;

export function reduce(nums: number[], fn: Fn, init: number): number {
  let accumulator = init;
  for (let i = 0; i < nums.length; i++) {
    accumulator = fn(accumulator, nums[i]);
  }
  return accumulator;
}
