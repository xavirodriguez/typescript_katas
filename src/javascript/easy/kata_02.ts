function createCounter(n: number): () => number {
  let count = n;
  return function () {
    return count++;
  };
}
/*
...
const createCounter: () => number  = (n: number) => () => n++;
const createCounter: (n: number) => () => number = (n: number) => () => n++;
*/
/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
