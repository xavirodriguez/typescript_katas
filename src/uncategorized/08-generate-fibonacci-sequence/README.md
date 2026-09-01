# 2648. Generate Fibonacci Sequence

**Difficulty**: Easy
**Topics**: JavaScript, Generator


---


## Problem Statement

Write a generator function that returns a generator object which yields the **fibonacci sequence**.

The **fibonacci sequence** is defined by the relation Xn = Xn-1 + Xn-2.

The first few numbers of the series are `0, 1, 1, 2, 3, 5, 8, 13`.


---


## Examples

### Example 1:

- **Input**: `callCount = 5`
- **Output**: `[0,1,1,2,3]`
- **Explanation**:
  ```ts
  const gen = fibGenerator();
  gen.next().value; // 0
  gen.next().value; // 1
  gen.next().value; // 1
  gen.next().value; // 2
  gen.next().value; // 3
  ```


---


## Constraints

- `0 <= callCount <= 50`


---


## Complexity

- **Time Complexity**: O(1) per yield
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
