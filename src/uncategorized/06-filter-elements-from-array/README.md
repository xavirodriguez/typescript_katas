# 2634. Filter Elements from Array

**Difficulty**: Easy
**Topics**: JavaScript, Array, Functional Programming


---


## Problem Statement

Given an integer array `arr` and a filtering function `fn`, return a filtered array `filteredArr`.

The `fn` function takes one or two arguments:

- `arr[i]` - number from the `arr`
- `i` - index of `arr[i]`

`filteredArr` should only contain the elements from the `arr` for which the expression `fn(arr[i], i)` evaluates to a truthy value. A **truthy** value is a value where `Boolean(value)` returns `true`.

Please solve it without the built-in `Array.prototype.filter` method.


---


## Examples

### Example 1:

- **Input**: `arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }`
- **Output**: `[20,30]`
- **Explanation**:
  - `fn(0, 0)` = false
  - `fn(10, 1)` = false
  - `fn(20, 2)` = true
  - `fn(30, 3)` = true

### Example 2:

- **Input**: `arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }`
- **Output**: `[1]`
- **Explanation**:
  - `fn(1, 0)` = true
  - `fn(2, 1)` = false
  - `fn(3, 2)` = false

### Example 3:

- **Input**: `arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }`
- **Output**: `[-2,0,1,2]`
- **Explanation**: Falsey values such as 0 should be filtered out.


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
