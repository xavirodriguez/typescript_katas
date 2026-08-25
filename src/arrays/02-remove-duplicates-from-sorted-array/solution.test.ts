import { removeDuplicates } from './solution';

describe('removeDuplicates', () => {
  describe('Normal cases', () => {
    it('should remove duplicates from sorted array', () => {
      const nums = [1, 1, 2];
      const result = removeDuplicates(nums);

      expect(result).toBe(2);
      expect(nums.slice(0, result)).toEqual([1, 2]);
    });

    it('should handle array with multiple duplicates', () => {
      const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
      const result = removeDuplicates(nums);

      expect(result).toBe(5);
      expect(nums.slice(0, result)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should handle array with no duplicates', () => {
      const nums = [1, 2, 3, 4, 5];
      const result = removeDuplicates(nums);

      expect(result).toBe(5);
      expect(nums.slice(0, result)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle negative numbers', () => {
      const nums = [-3, -3, -1, -1, 0, 0, 1, 1];
      const result = removeDuplicates(nums);

      expect(result).toBe(4);
      expect(nums.slice(0, result)).toEqual([-3, -1, 0, 1]);
    });
  });

  describe('Edge cases', () => {
    it('should handle single element array', () => {
      const nums = [1];
      const result = removeDuplicates(nums);

      expect(result).toBe(1);
      expect(nums.slice(0, result)).toEqual([1]);
    });

    it('should handle array with all same elements', () => {
      const nums = [1, 1, 1, 1, 1];
      const result = removeDuplicates(nums);

      expect(result).toBe(1);
      expect(nums.slice(0, result)).toEqual([1]);
    });

    it('should handle two element array with duplicates', () => {
      const nums = [1, 1];
      const result = removeDuplicates(nums);

      expect(result).toBe(1);
      expect(nums.slice(0, result)).toEqual([1]);
    });

    it('should handle two element array without duplicates', () => {
      const nums = [1, 2];
      const result = removeDuplicates(nums);

      expect(result).toBe(2);
      expect(nums.slice(0, result)).toEqual([1, 2]);
    });
  });

  describe('Performance tests', () => {
    it('should handle large arrays efficiently', () => {
      // Create array with pattern: [1,1,2,2,3,3,...,500,500]
      const nums: number[] = [];
      for (let i = 1; i <= 500; i++) {
        nums.push(i, i);
      }

      const result = removeDuplicates(nums);

      expect(result).toBe(500);
      expect(nums.slice(0, result)).toEqual(Array.from({ length: 500 }, (_, i) => i + 1));
    });

    it('should handle array with many consecutive duplicates', () => {
      const nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
      const result = removeDuplicates(nums);

      expect(result).toBe(3);
      expect(nums.slice(0, result)).toEqual([1, 2, 3]);
    });
  });

  describe('Array modification validation', () => {
    it('should modify the original array in-place', () => {
      const nums = [1, 1, 2, 2, 3];
      const originalRef = nums;

      const result = removeDuplicates(nums);

      // Should be the same reference
      expect(nums).toBe(originalRef);
      expect(result).toBe(3);
      expect(nums.slice(0, result)).toEqual([1, 2, 3]);
    });

    it('should not change elements beyond the returned length', () => {
      const nums = [1, 1, 2, 2, 3, 3];
      const originalLength = nums.length;

      const result = removeDuplicates(nums);

      // Array length should remain the same
      expect(nums.length).toBe(originalLength);
      // Only care about the first 'result' elements
      expect(nums.slice(0, result)).toEqual([1, 2, 3]);
    });
  });
});
