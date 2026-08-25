import { countBits } from './solution';

describe('countBits', () => {
  describe('basic cases', () => {
    it('should return [0] when n is 0', () => {
      expect(countBits(0)).toEqual([0]);
    });

    it('should count bits correctly for n = 1', () => {
      expect(countBits(1)).toEqual([0, 1]);
    });

    it('should count bits correctly for n = 2', () => {
      expect(countBits(2)).toEqual([0, 1, 1]);
    });

    it('should count bits correctly for n = 5', () => {
      expect(countBits(5)).toEqual([0, 1, 1, 2, 1, 2]);
    });
  });

  describe('larger inputs', () => {
    it('should count bits correctly up to 8', () => {
      expect(countBits(8)).toEqual([
        0, // 0
        1, // 1
        1, // 10
        2, // 11
        1, // 100
        2, // 101
        2, // 110
        3, // 111
        1, // 1000
      ]);
    });

    it('should count bits correctly up to 16', () => {
      expect(countBits(16)).toEqual([
        0, // 0
        1, // 1
        1, // 10
        2, // 11
        1, // 100
        2, // 101
        2, // 110
        3, // 111
        1, // 1000
        2, // 1001
        2, // 1010
        3, // 1011
        2, // 1100
        3, // 1101
        3, // 1110
        4, // 1111
        1, // 10000
      ]);
    });
  });

  describe('result properties', () => {
    it('should return an array of length n + 1', () => {
      const n = 10;

      expect(countBits(n)).toHaveLength(n + 1);
    });

    it('should always return 0 for index 0', () => {
      expect(countBits(20)[0]).toBe(0);
    });

    it('should return the correct number of bits for powers of two', () => {
      const result = countBits(16);

      expect(result[1]).toBe(1);
      expect(result[2]).toBe(1);
      expect(result[4]).toBe(1);
      expect(result[8]).toBe(1);
      expect(result[16]).toBe(1);
    });

    it('should return increasing bit counts for numbers consisting only of 1s', () => {
      const result = countBits(15);

      expect(result[1]).toBe(1); // 1
      expect(result[3]).toBe(2); // 11
      expect(result[7]).toBe(3); // 111
      expect(result[15]).toBe(4); // 1111
    });
  });
});
