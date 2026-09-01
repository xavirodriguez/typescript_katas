# 2623. Memoize

**Difficulty**: Medium
**Topics**: JavaScript, Closure, Higher-Order Functions


---


## Problem Statement

Given a function `fn`, return a **memoized** version of that function.

A **memoized** function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are **3** possible input functions: `sum`, `fib`, and `factorial`.

- `sum` accepts two integers `a` and `b` and returns `a + b`.
- `fib` accepts a single integer `n` and returns `1` if `n <= 1` or `fib(n - 1) + fib(n - 2)` otherwise.
- `factorial` accepts a single integer `n` and returns `1` if `n <= 1` or `factorial(n - 1) * n` otherwise.


---


## Examples

### Example 1:

- **Input**:
  - `fnName = "sum"`
  - `actions = ["call","call","getCallCount","call","getCallCount"]`
  - `values = [[2,2],[2,2],[],[1,2],[]]`
- **Output**: `[4,4,1,3,1]`
- **Explanation**:
  - sum(2, 2): returns 4. fn() was called.
  - sum(2, 2): returns 4. fn() was not called because the same inputs were seen before.
  - Total call count: 1.
  - sum(1, 2): returns 3. fn() was called.
  - Total call count: 1.

### Example 2:

- **Input**:
  - `fnName = "factorial"`
  - `actions = ["call","call","call","getCallCount","call","getCallCount"]`
  - `values = [[2],[3],[2],[],[3],[]]`
- **Output**: `[2,6,2,2,6,2]`
- **Explanation**:
  - factorial(2): returns 2.
  - factorial(3): returns 6.
  - factorial(2): returns 2.
  - Total call count: 2.
  - factorial(3): returns 6.
  - Total call count: 2.


---


## Constraints

- `0 <= a, b <= 100000`
- `1 <= n <= 10`
- `0 <= actions.length <= 100000`
- `actions[i]` is one of `"call"` or `"getCallCount"`


---


## Complexity

- **Time Complexity**: O(1) for cached calls
- **Space Complexity**: O(n) where n is the number of unique argument combinations


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
