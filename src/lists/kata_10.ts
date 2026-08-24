export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function hasCycle(head: ListNode | null): boolean {
  let pointer1: ListNode | null;
  let pointer2: ListNode | null;
  if (head != null) {
    pointer1 = head;
    pointer2 = head;
    while (pointer1 != null) {
      pointer1 = pointer1.next;
      pointer2 = pointer2?.next ? pointer2.next : head;
      pointer2 = pointer2?.next ? pointer2.next : head;

      if (pointer1 == pointer2) {
        return true;
      }
    }
  }
  return false;
}
