# 2622. Cache With Time Limit

**Difficulty**: Medium
**Topics**: JavaScript, Class, Closure


---


## Problem Statement

Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

- `set(key, value, duration)`: accepts an integer `key`, an integer `value`, and a `duration` in milliseconds. Once the `duration` has elapsed, the key should be inaccessible. The method should return `true` if the same un-expired key already exists and `false` otherwise. Both the value and duration should be overwritten if the key already exists.
- `get(key)`: if an un-expired key exists, it should return the associated value. Otherwise it should return `-1`.
- `count()`: returns the count of un-expired keys.


---


## Examples

### Example 1:

- **Input**:
  ```json
  inputs = ["TimeLimitedCache", "set", "get", "count", "get"]
  time = [0, 0, 50, 50, 150]
  params = [[], [1, 42, 100], [1], [], [1]]
  ```
- **Output**: `[null, false, 42, 1, -1]`
- **Explanation**:
  At t=0, the cache is constructed.
  At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The key didn't exist so false is returned.
  At t=50, get(1) is called which returns 42.
  At t=50, count() is called which returns 1.
  At t=150, get(1) is called which returns -1.


---


## Constraints

- `0 <= key, value <= 10⁹`
- `0 <= duration <= 1000`
- `1 <= calls.length <= 100`
- `0 <= time <= 1000`


---


## Complexity

- **Time Complexity**: O(1) for `set`, `get`, and `count`
- **Space Complexity**: O(n) where n is the number of active cached keys


---


## Solution

- [solution-a.ts](./solution-a.ts)
- [solution-b.ts](./solution-b.ts)
- [solution.test.ts](./solution.test.ts)
