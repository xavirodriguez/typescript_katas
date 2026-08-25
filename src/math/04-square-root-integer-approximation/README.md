# 69. Sqrt(x)

**Difficulty**: Easy
**Topics**: Math, Binary Search


---


## Problem Statement

## Statement

Given a non-negative integer `x`, return **the square root of `x` rounded down** to the nearest integer.  
The result must also be a non-negative integer.

📌 **Restrictions:**

- Do **not** use any built-in exponentiation functions or operators.  
  (e.g., `pow(x, 0.5)`, `x ** 0.5`, or similar).

## ✍️ Examples

Input: x = 4
Output: 2
Explanation: sqrt(4) = 2 → return 2

Input: x = 8
Output: 2
Explanation: sqrt(8) ≈ 2.828 → return 2

## 🔒 Constraints

- `0 <= x <= 2³¹ - 1`

## 🚫 Forbidden

Avoid using:

- `**`, `pow()`, `sqrt()`, or equivalent built-in methods.

## ✅ Goals

- Reinforce binary search and edge case handling.
- Improve problem-solving under constraints.
- Practice writing clean and efficient integer logic.


---


## Complexity

- **Time Complexity**: O(log x)
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
