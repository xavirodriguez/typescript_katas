type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type OnceFn = (...args: JSONValue[]) => JSONValue | undefined;

function once(fn: Function): OnceFn {
  // My solution was using a hasBeenCalled var but I saw this counter in the solutions and I loved it:D
  let a = 0;
  return function (...args) {
    a++;
    if (a > 1) {
      return undefined;
    }
    return fn(...args);
  };
}
