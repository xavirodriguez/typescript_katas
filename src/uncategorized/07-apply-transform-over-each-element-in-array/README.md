# 2635. Apply Transform Over Each Element in Array

**Difficulty**: Easy
**Topics**: JavaScript, Array, Functional Programming


---


## Problem Statement

Given an integer array `arr` and a mapping function `fn`, return a new array with a transformation applied to each element.

The returned array should be created such that `returnedArray[i] = fn(arr[i], i)`.

Please solve it without the built-in `Array.prototype.map` method.


---


## Examples

### Example 1:

- **Input**: `arr = [1,2,3], fn = function plusone(n) { return n + 1; }`
- **Output**: `[2,3,4]`
- **Explanation**:
  - `const newArray = new Array(arr.length);`
  - `newArray[0] = fn(arr[0], 0); // 2`
  - `newArray[1] = fn(arr[1], 1); // 3`
  - `newArray[2] = fn(arr[2], 2); // 4`
  - `return newArray;`

### Example 2:

- **Input**: `arr = [1,2,3], fn = function plusI(n, i) { return n + i; }`
- **Output**: `[1,3,5]`
- **Explanation**: The function increases each value by the index it resides in.

### Example 3:

- **Input**: `arr = [10,20,30], fn = function constant() { return 42; }`
- **Output**: `[42,42,42]`
- **Explanation**: The function always returns 42.


---


## Constraints

- `0 <= arr.length <= 1000`
- `-10⁹ <= arr[i] <= 10⁹`


---


## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
