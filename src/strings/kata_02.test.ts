import { isAnagram } from './kata_02';

describe('isAnagram', () => {
  test('Art & Rat', () => {
    expect(isAnagram('art', 'rat')).toBe(true);
  });
  test('Pet & tet', () => {
    expect(isAnagram('pet', 'tet')).toBe(false);
  });
});
