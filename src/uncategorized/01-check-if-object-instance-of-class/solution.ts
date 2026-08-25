function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  if (obj === null || obj === undefined) return false;
  if (typeof classFunction !== 'function') return false;

  let current = obj; //Copiamos la referencia del objeto

  while (current !== null) {
    if (Object.getPrototypeOf(current) === classFunction.prototype) {
      return true;
    }
    current = Object.getPrototypeOf(current);
  }

  return false;
}

// Help me to write some test cases for this function

const a = new Date();
// Test cases for checkIfInstanceOf function
console.log(checkIfInstanceOf(a, Date)); // true
console.log(checkIfInstanceOf(a, Object)); // true
console.log(checkIfInstanceOf(a, Array)); // false

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */
