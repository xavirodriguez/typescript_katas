# 2620. Counter

**Difficulty**: Easy
**Topics**: JavaScript, Closure


---


## Problem Statement

Given an integer `n`, return a `counter` function. This counter function initially returns `n` and then returns 1 more than the previous value every subsequent time it is called (`n`, `n + 1`, `n + 2`, etc).


---


## Examples

### Example 1:

- **Input**: `n = 10, ["call","call","call"]`
- **Output**: `[10,11,12]`
- **Explanation**:
  - `counter()` = 10
  - `counter()` = 11
  - `counter()` = 12

### Example 2:

- **Input**: `n = -2, ["call","call","call","call","call"]`
- **Output**: `[-2,-1,0,1,2]`
- **Explanation**: counter() initially returns -2. Then increases after each subsequent call.


---


## Constraints

- `-1000 <= n <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i] === "call"`


---


## Complexity

- **Time Complexity**: O(1) per call
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
