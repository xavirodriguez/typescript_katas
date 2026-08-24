function missingNumber(nums: number[]): number {
  nums = nums.sort();

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[--i]++) {
      return nums[--i];
    }
  }
}
