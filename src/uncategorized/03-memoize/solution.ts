type Fun = (...params: number[]) => number;

function memoize(fn: Fun): Fun {
  const resultados = new Map<string, number>();
  return function (...args) {
    // alternativamente podria usar const key = args.join(",")
    let argus = JSON.stringify(args);
    let result = resultados.get(argus);
    if (result != undefined) {
      return result;
    }
    let res = fn(...args);
    resultados.set(JSON.stringify(args), res);
    return res;
  };
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});

memoizedFn(0, 0); // 5
memoizedFn(0, 0); // 5
console.log(callCount); // 1
