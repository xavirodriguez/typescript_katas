# 21. Merge Two Sorted Lists

**Difficulty**: Easy
**Topics**: Linked List, Recursion


---


## Problem Statement

## 📘 Problem Statement

You are given the heads of **two sorted linked lists**, `list1` and `list2`.

Your task is to **merge the two lists into one sorted linked list** by **splicing together the nodes** of the original lists.

🔁 The resulting list should remain in ascending order.

📤 Return the **head node** of the merged linked list.


---


## 🧪 Example

```ts
Input: ((list1 = [1, 2, 4]), (list2 = [1, 3, 4]));
Output: [1, 1, 2, 3, 4, 4];
```

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
```


---


## Complexity

- **Time Complexity**: O(n + m)
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
