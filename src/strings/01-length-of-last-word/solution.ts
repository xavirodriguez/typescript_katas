export function lengthOfLastWord(s: string): number {
  const lastWord: string[] = [];
  let trimming = true;

  for (let i = s.length - 1; i >= 0; i--) {
    if (trimming) {
      if (s[i] == ' ') {
        continue;
      } else {
        trimming = false;
      }
    }
    if (s[i] == ' ') {
      break;
    } else {
      lastWord.unshift(s[i]);
    }
  }
  return lastWord.length;
}
