# 338. Counting Bits

**Difficulty**: Easy
**Topics**: Dynamic Programming, Bit Manipulation


---


## Problem Statement

Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the **number of 1's** in the binary representation of `i`.


---


## Examples

### Example 1:

- **Input**: `n = 2`
- **Output**: `[0,1,1]`
- **Explanation**:
  - 0 --> 0
  - 1 --> 1
  - 2 --> 10

### Example 2:

- **Input**: `n = 5`
- **Output**: `[0,1,1,2,1,2]`
- **Explanation**:
  - 0 --> 0
  - 1 --> 1
  - 2 --> 10
  - 3 --> 11
  - 4 --> 100
  - 5 --> 101


---


## Constraints

- `0 <= n <= 10⁵`


---


## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
