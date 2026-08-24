import { removeElement } from './kata_03';

describe('removeElement', () => {
  describe('Basic functionality', () => {
    it('should remove all occurrences of val and return correct count', () => {
      const nums = [3, 2, 2, 3];
      const result = removeElement(nums, 3);

      expect(result).toBe(2);
      // First k elements should not contain val (order doesn't matter)
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(3);
      expect(firstK.sort()).toEqual([2, 2]);
    });

    it('should handle example 2 from problem statement', () => {
      const nums = [0, 1, 2, 2, 3, 0, 4, 2];
      const result = removeElement(nums, 2);

      expect(result).toBe(5);
      // First k elements should not contain val
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(2);
      expect(firstK.sort()).toEqual([0, 0, 1, 3, 4]);
    });

    it('should handle array with no occurrences of val', () => {
      const nums = [1, 2, 3, 4, 5];
      const result = removeElement(nums, 6);

      expect(result).toBe(5);
      expect(nums.slice(0, result)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle array with all elements equal to val', () => {
      const nums = [2, 2, 2, 2];
      const result = removeElement(nums, 2);

      expect(result).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array', () => {
      const nums: number[] = [];
      const result = removeElement(nums, 1);

      expect(result).toBe(0);
    });

    it('should handle single element array - element equals val', () => {
      const nums = [1];
      const result = removeElement(nums, 1);

      expect(result).toBe(0);
    });

    it('should handle single element array - element not equals val', () => {
      const nums = [1];
      const result = removeElement(nums, 2);

      expect(result).toBe(1);
      expect(nums[0]).toBe(1);
    });

    it('should handle two element array - both equal to val', () => {
      const nums = [1, 1];
      const result = removeElement(nums, 1);

      expect(result).toBe(0);
    });

    it('should handle two element array - one equals val', () => {
      const nums = [1, 2];
      const result = removeElement(nums, 1);

      expect(result).toBe(1);
      expect(nums[0]).toBe(2);
    });

    it('should handle two element array - none equals val', () => {
      const nums = [1, 2];
      const result = removeElement(nums, 3);

      expect(result).toBe(2);
      expect(nums.slice(0, result)).toEqual([1, 2]);
    });
  });

  describe('Boundary value tests', () => {
    it('should handle val = 0', () => {
      const nums = [0, 1, 2, 0, 3, 0, 4];
      const result = removeElement(nums, 0);

      expect(result).toBe(4);
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(0);
      expect(firstK.sort()).toEqual([1, 2, 3, 4]);
    });

    it('should handle val = 50 (max constraint)', () => {
      const nums = [50, 1, 2, 50, 3, 50];
      const result = removeElement(nums, 50);

      expect(result).toBe(3);
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(50);
      expect(firstK.sort()).toEqual([1, 2, 3]);
    });

    it('should handle maximum array size constraint', () => {
      // Create array of size 100 with alternating pattern
      const nums = Array.from({ length: 100 }, (_, i) => i % 2);
      const result = removeElement(nums, 0);

      expect(result).toBe(50);
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(0);
      expect(firstK.every((x) => x === 1)).toBe(true);
    });
  });

  describe('In-place modification validation', () => {
    it('should modify the original array in-place', () => {
      const nums = [1, 2, 3, 2, 4];
      const originalRef = nums;

      const result = removeElement(nums, 2);

      // Should be the same reference
      expect(nums).toBe(originalRef);
      expect(result).toBe(3);

      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(2);
      expect(firstK.sort()).toEqual([1, 3, 4]);
    });
  });

  describe('Performance tests', () => {
    it('should handle large arrays efficiently', () => {
      const nums = Array.from({ length: 1000 }, (_, i) => i % 10);
      const result = removeElement(nums, 5);

      expect(result).toBe(900); // 1000 - 100 occurrences of 5
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(5);
    });

    it('should handle array with many consecutive duplicates', () => {
      const nums = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3];
      const result = removeElement(nums, 1);

      expect(result).toBe(9);
      const firstK = nums.slice(0, result);
      expect(firstK).not.toContain(1);
      expect(firstK.filter((x) => x === 2)).toHaveLength(3);
      expect(firstK.filter((x) => x === 3)).toHaveLength(6);
    });
  });

  describe('Custom Judge simulation', () => {
    it('should pass custom judge logic for example 1', () => {
      const nums = [3, 2, 2, 3];
      const val = 3;
      const expectedNums = [2, 2];

      const k = removeElement(nums, val);

      // Simulate judge logic
      expect(k).toBe(expectedNums.length);

      // Sort first k elements
      const firstK = nums.slice(0, k).sort();

      // Compare with expected
      expect(firstK).toEqual(expectedNums.sort());
    });

    it('should pass custom judge logic for example 2', () => {
      const nums = [0, 1, 2, 2, 3, 0, 4, 2];
      const val = 2;
      const expectedNums = [0, 1, 4, 0, 3];

      const k = removeElement(nums, val);

      // Simulate judge logic
      expect(k).toBe(expectedNums.length);

      // Sort first k elements
      const firstK = nums.slice(0, k).sort();

      // Compare with expected
      expect(firstK).toEqual(expectedNums.sort());
    });
  });
});
