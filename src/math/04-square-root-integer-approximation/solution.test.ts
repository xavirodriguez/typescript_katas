import { mySqrt } from './solution';

describe('mySqrt', () => {
  test('should return 0 for input 0', () => {
    expect(mySqrt(0)).toBe(0);
  });

  test('should return 1 for input 1', () => {
    expect(mySqrt(1)).toBe(1);
  });

  test('should return 2 for input 4', () => {
    expect(mySqrt(4)).toBe(2);
  });

  test('should return 2 for input 8 (rounded down)', () => {
    expect(mySqrt(8)).toBe(2);
  });

  test('should return 3 for input 10', () => {
    expect(mySqrt(10)).toBe(3);
  });

  test('should return 46339 for input 2147395599 (edge case)', () => {
    expect(mySqrt(2147395599)).toBe(46339);
  });

  test('should return 46340 for input 2147483647 (max input)', () => {
    expect(mySqrt(2147483647)).toBe(46340);
  });

  test('should handle large perfect squares', () => {
    expect(mySqrt(1000000)).toBe(1000);
    expect(mySqrt(121)).toBe(11);
  });
});
