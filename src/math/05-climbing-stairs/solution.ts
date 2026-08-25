export function climbStairs(n: number): number {
  let previous: number = 2; //n 2
  let last: number = 3; //n3
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  if (n == 3) {
    return 3;
  } else {
    for (let i = 3; i < n; i++) {
      const calc = previous + last;
      previous = last;
      last = calc;
    }
    return last;
  }
}

/*
Solucion 2..WIP
  let half = n / 2;
  //x = doubleStep
  let y = 0; //singleStep
  for (let x = half; x >= 0; x--) {
    count = count + x + y;
    y = y + 2;
  }
  */
