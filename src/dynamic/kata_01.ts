export function countBits(n: number): number[] {
  const answer: number[] = [0];
  for (let i = 1; i < n + 1; i++) {
    answer.push(answer[Math.floor(i / 2)] + (i % 2));
  }
  return answer;
}
