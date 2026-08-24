import { climbStairs } from './kata_05';

describe('climbStairs', () => {
  test('caso base n = 1', () => {
    expect(climbStairs(1)).toBe(1);
  });

  test('caso base n = 2', () => {
    expect(climbStairs(2)).toBe(2);
  });

  test('caso simple n = 3', () => {
    expect(climbStairs(3)).toBe(3);
  });

  test('n = 4', () => {
    expect(climbStairs(4)).toBe(5);
  });

  test('n = 5', () => {
    expect(climbStairs(5)).toBe(8);
  });

  test('n = 10', () => {
    expect(climbStairs(10)).toBe(89);
  });

  test('n = 20', () => {
    expect(climbStairs(20)).toBe(10946);
  });

  test('n = 30', () => {
    expect(climbStairs(30)).toBe(1346269);
  });

  test('n = 45', () => {
    expect(climbStairs(45)).toBe(1836311903);
  });
});
