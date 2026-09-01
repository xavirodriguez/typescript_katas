# 2618. Check if Object Instance of Class

**Difficulty**: Medium
**Topics**: JavaScript, Prototype, Recursion


---


## Problem Statement

Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the function. For example, the value or the class could be `undefined`.


---


## Examples

### Example 1:

- **Input**: `func = () => checkIfInstanceOf(new Date(), Date)`
- **Output**: `true`
- **Explanation**: The object returned by the Date constructor is, by definition, an instance of Date.

### Example 2:

- **Input**: `func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }`
- **Output**: `true`
- **Explanation**: Dog inherits from Animal. An object of class Dog is also an instance of Animal.

### Example 3:

- **Input**: `func = () => checkIfInstanceOf(Date, Date)`
- **Output**: `false`
- **Explanation**: A date constructor does not, logically, have the class methods from Date itself.

### Example 4:

- **Input**: `func = () => checkIfInstanceOf(5, Number)`
- **Output**: `true`
- **Explanation**: 5 is a Number. Primitive numbers are instances of Number when checking access to methods.


---


## Constraints

- `obj` and `classFunction` can be any value or type.


---


## Complexity

- **Time Complexity**: O(p) where p is the depth of the prototype chain
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
