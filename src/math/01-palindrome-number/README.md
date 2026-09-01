# 9. Palindrome Number

**Difficulty**: Easy
**Topics**: Math


---


## Problem Statement

Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.


---


## Examples

### Example 1:

- **Input**: `x = 121`
- **Output**: `true`
- **Explanation**: `121` reads as `121` from left to right and from right to left.

### Example 2:

- **Input**: `x = -121`
- **Output**: `false`
- **Explanation**: From left to right, it reads `-121`. From right to left, it becomes `121-`. Therefore it is not a palindrome.

### Example 3:

- **Input**: `x = 10`
- **Output**: `false`
- **Explanation**: Reads `01` from right to left. Therefore it is not a palindrome.


---


## Constraints

- `-2³¹ <= x <= 2³¹ - 1`


---


## Complexity

- **Time Complexity**: O(log10(x))
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
