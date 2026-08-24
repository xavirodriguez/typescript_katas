export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function main() {
  const n1: ListNode = new ListNode(4);
  const n2: ListNode = new ListNode(3, n1);
  const n3: ListNode = new ListNode(1, n2);

  const n4: ListNode = new ListNode(5);
  const n5: ListNode = new ListNode(2, n4);
  const n6: ListNode = new ListNode(1, n5);

  const result = mergeTwoLists(n6, n3);
  printList(result);
}

function printList(node: ListNode | null) {
  while (node) {
    console.log(node.val);
    node = node.next;
  }
}
export function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(); // Dummy node with val = 0
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 || list2;

  return dummy.next;
}
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const result: ListNode = new ListNode(0);
  let currentNode: ListNode = result;

  // Mientras ambas listas tengan elementos
  let working = true;

  do {
    if (list1 && list2)
      if (list1.val <= list2.val) {
        currentNode.next = list1;
        currentNode = currentNode.next;
        list1 = list1.next;
      } else {
        currentNode.next = list2;
        currentNode = currentNode.next;

        list2 = list2.next;
      }
    if (list1 && !list2) {
      currentNode.next = list1;

      working = false;
    }

    if (list2 && !list1) {
      currentNode.next = list2;

      working = false;
    }
  } while (working);

  return result.next;
}

main();
