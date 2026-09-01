# 58. Length of Last Word

**Difficulty**: Easy
**Topics**: String


---


## Problem Statement

Given a string `s` consisting of words and spaces, return _the length of the last word in the string_.

A **word** is a maximal substring consisting of non-space characters only.


---


## Examples

### Example 1:

- **Input**: `s = "Hello World"`
- **Output**: `5`
- **Explanation**: The last word is "World" with length 5.

### Example 2:

- **Input**: `s = "   fly me   to   the moon  "`
- **Output**: `4`
- **Explanation**: The last word is "moon" with length 4.

### Example 3:

- **Input**: `s = "luffy is still joyboy"`
- **Output**: `6`
- **Explanation**: The last word is "joyboy" with length 6.


---


## Constraints

- `1 <= s.length <= 10⁴`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.


---


## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
