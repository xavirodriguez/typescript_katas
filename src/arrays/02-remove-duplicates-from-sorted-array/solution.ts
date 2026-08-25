export function removeDuplicates(nums: number[]): number {
  let i: number = 1;
  let writeIndex: number = 1;

  for (i; i < nums.length; i++) {
    if (nums[i] > nums[writeIndex - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  return writeIndex;
}
