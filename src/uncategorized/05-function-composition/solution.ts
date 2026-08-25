type F = (x: number) => number;

function compose(functions: F[]): F {
  let composedFunction: F = (x: number) => x;

  for (let i = functions.length - 1; i >= 0; i--) {
    const currentFunction = functions[i];
    const previousComposition = composedFunction;
    composedFunction = (x) => currentFunction(previousComposition(x));
  }

  return composedFunction;
}
