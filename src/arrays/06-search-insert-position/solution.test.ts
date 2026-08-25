import { searchInsert } from './solution';

describe('searchInsert', () => {
  //Example
  test('Example 1', () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  });

  test('Example 2', () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  });
  test('Example 3', () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });

  test('Example 4', () => {
    expect(searchInsert([1, 2, 3, 5, 6, 7], 8)).toBe(6);
  });

  test('Example 5', () => {
    expect(searchInsert([5, 6], 2)).toBe(0);
  });
  test('Example 6', () => {
    expect(searchInsert([8, 9, 10], 7)).toBe(0);
  });
});
