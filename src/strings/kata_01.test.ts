import { lengthOfLastWord } from './kata_01';

describe('searchInsert', () => {
  test('World has 5 characters', () => {
    expect(lengthOfLastWord('Hello World')).toBe(5);
  });
  test('Moon has 4 characters', () => {
    expect(lengthOfLastWord('   fly me   to   the moon  ')).toBe(4);
  });
  test('Joyboy has 6 characters', () => {
    expect(lengthOfLastWord('luffy is still joyboy')).toBe(6);
  });
  test('a is a single character', () => {
    expect(lengthOfLastWord('a')).toBe(1);
  });
});
