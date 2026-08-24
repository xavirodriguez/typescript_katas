function searchClosestPosition(nums: number[], target: number, start: number, end: number) {
  const middle = Math.floor((start + end) / 2);

  if (nums[middle] == target || start == end) {
    return middle;
  }
  if (target < nums[middle]) {
    return searchClosestPosition(nums, target, start, middle);
  } else {
    return searchClosestPosition(nums, target, middle + 1, end);
  }
}
export function searchInsert(nums: number[], target: number): number {
  if (target > nums[nums.length - 1]) {
    return nums.length;
  }
  if (target < nums[0]) {
    return 0;
  }
  return searchClosestPosition(nums, target, 0, nums.length - 1);
}
