# 2629. Function Composition

**Difficulty**: Easy
**Topics**: JavaScript


---


## Problem Statement

Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The **function composition** of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The **function composition** of an empty list of functions is the **identity function** f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.

### Example 1:

**Input:** functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
**Output:** 65
**Explanation:**
Evaluating from right to left ...
Starting with x = 4.
2 _ (4) = 8
(8) _ (8) = 64
(64) + 1 = 65

### Example 2:

**Input:** functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
**Output:** 1000
**Explanation:**
Evaluating from right to left ...
10 _ (1) = 10
10 _ (10) = 100
10 \* (100) = 1000

**Input:**

```
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
```

**Output:** 130
**Explanation:**
initially, the value is init=100.
(100) + nums[0] _ nums[0] = 101
(101) + nums[1] _ nums[1] = 105
(105) + nums[2] _ nums[2] = 114
(114) + nums[3] _ nums[3] = 130
The final answer is 130.

### Ejemplo 3:

Input:

Output: 25

**Input:**
v

```
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
```

**Output:** 25
**Explanation:**
For empty arrays, the answer is always init.


---


### Constraints:

- `0 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- `0 <= init <= 1000`


---


## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
