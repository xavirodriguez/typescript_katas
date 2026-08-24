export function removeElement(nums: number[], val: number): number {
  let i: number = 0;

  for (i; i < nums.length; i++) {
    if (nums[i] == val) {
      nums.splice(i--, 1);
    }
  }
  return nums.length;
}
