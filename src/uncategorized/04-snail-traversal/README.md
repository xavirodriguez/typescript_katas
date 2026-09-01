# 2624. Snail Traversal

**Difficulty**: Medium
**Topics**: JavaScript, Array, Matrix


---


## Problem Statement

Write code that enhances all arrays such that you can call the `snail(rowsCount, colsCount)` method that transforms the 1D array into a 2D array organized in the pattern known as **snail traversal order**. Invalid input values should output an empty array. If `rowsCount * colsCount !== nums.length`, the input is considered invalid.

Snail traversal order starts by traversing the first column with top-to-bottom order, then the second column with bottom-to-top order, then the third column with top-to-bottom order, and so on until all columns are processed.


---


## Examples

### Example 1:

- **Input**:
  - `nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]`
  - `rowsCount = 5, colsCount = 4`
- **Output**:
  ```json
  [
   [19, 17, 16, 15],
   [10, 1, 14, 4],
   [3, 2, 12, 20],
   [7, 8, 18, 11],
   [9, 5, 6, 13]
  ]
  ```

### Example 2:

- **Input**:
  - `nums = [1, 2, 3, 4]`
  - `rowsCount = 1, colsCount = 4`
- **Output**: `[[1, 2, 3, 4]]`

### Example 3:

- **Input**:
  - `nums = [1, 2, 3, 4]`
  - `rowsCount = 2, colsCount = 2`
- **Output**: `[[1, 4], [2, 3]]`


---


## Constraints

- `0 <= nums.length <= 250`
- `1 <= rowsCount <= 250`
- `1 <= colsCount <= 250`


---


## Complexity

- **Time Complexity**: O(rowsCount * colsCount)
- **Space Complexity**: O(rowsCount * colsCount)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
