export function isAnagram(s: string, t: string): boolean {
  if (t.length != s.length) return false;
  return solution1(s, t);
}
function solution2(s: string, t: string): boolean {
  let freq = new Map<string, number>();
  for (let c of s) {
    freq.set(c, (freq.get(c) || 0) + 1);
  }
  for (let c of t) {
    freq.set(c, (freq.get(c) || 0) - 1);
  }
  for (let val of freq.values()) {
    if (val !== 0) {
      return false;
    }
  }
  return true;
}
function solution1(s: string, t: string): boolean {
  return s.split('').sort().join('') === t.split('').sort().join('');
}
isAnagram('art', 'rat');
