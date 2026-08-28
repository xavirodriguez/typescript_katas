# 338. Counting Bits

**Difficulty**: Easy
**Topics**: Dynamic Programming, Bit Manipulation

---

## Problem Statement

## Problem

Given an integer `n`, return an array `ans` of length `n + 1` such that:

> `ans[i]` is the number of `1`s in the binary representation of `i`, for every `0 <= i <= n`.

### Constraint

Do **not** use built-in functions that directly count set bits, such as `__builtin_popcount` in C++.


---


## Example 1

**Input:**

```text
n = 2
```

**Output:**

```text
[0, 1, 1]
```

**Explanation:**

```text
0 → 0      → 0 ones
1 → 1      → 1 one
2 → 10     → 1 one
```


---


## Example 2

**Input:**

```text
n = 5
```

**Output:**

```text
[0, 1, 1, 2, 1, 2]
```

**Explanation:**

```text
0 → 0      → 0 ones
1 → 1      → 1 one
2 → 10     → 1 one
3 → 11     → 2 ones
4 → 100    → 1 one
5 → 101    → 2 ones
```


---


## Expected Result

Return an array containing the number of set bits (`1`s) for every integer from `0` to `n`.

### Example

For `n = 5`:

```text
Index:  0  1  2  3  4  5
Bits:   0  1  1  2  1  2
```

---

## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
