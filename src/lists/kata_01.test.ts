import { ListNode, mergeTwoLists } from './kata_01';

// Helper functions for testing
function createList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

describe('mergeTwoLists', () => {
  describe('Normal cases', () => {
    it('should merge two sorted lists correctly', () => {
      const list1 = createList([1, 2, 4]);
      const list2 = createList([1, 3, 4]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 1, 2, 3, 4, 4]);
    });

    it('should handle lists of different sizes', () => {
      const list1 = createList([1, 5, 6]);
      const list2 = createList([2, 3, 4, 7, 8, 9]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should handle single element lists', () => {
      const list1 = createList([1]);
      const list2 = createList([2]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 2]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty first list', () => {
      const list1 = createList([]);
      const list2 = createList([0, 1, 2]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([0, 1, 2]);
    });

    it('should handle empty second list', () => {
      const list1 = createList([1, 2, 3]);
      const list2 = createList([]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 2, 3]);
    });

    it('should handle both empty lists', () => {
      const list1 = createList([]);
      const list2 = createList([]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([]);
    });

    it('should handle null inputs', () => {
      const result1 = mergeTwoLists(null, createList([1, 2, 3]));
      const result2 = mergeTwoLists(createList([1, 2, 3]), null);
      const result3 = mergeTwoLists(null, null);

      expect(listToArray(result1)).toEqual([1, 2, 3]);
      expect(listToArray(result2)).toEqual([1, 2, 3]);
      expect(listToArray(result3)).toEqual([]);
    });
  });

  describe('Special cases', () => {
    it('should handle all elements from list1 being smaller', () => {
      const list1 = createList([1, 2, 3]);
      const list2 = createList([4, 5, 6]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle all elements from list2 being smaller', () => {
      const list1 = createList([4, 5, 6]);
      const list2 = createList([1, 2, 3]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle duplicate elements', () => {
      const list1 = createList([1, 1, 2]);
      const list2 = createList([1, 2, 2]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([1, 1, 1, 2, 2, 2]);
    });

    it('should handle negative numbers', () => {
      const list1 = createList([-3, -1, 0]);
      const list2 = createList([-2, 1, 2]);

      const result = mergeTwoLists(list1, list2);

      expect(listToArray(result)).toEqual([-3, -2, -1, 0, 1, 2]);
    });
  });

  describe('Performance considerations', () => {
    it('should handle larger lists efficiently', () => {
      const list1 = createList(Array.from({ length: 1000 }, (_, i) => i * 2));
      const list2 = createList(Array.from({ length: 1000 }, (_, i) => i * 2 + 1));

      const result = mergeTwoLists(list1, list2);
      const resultArray = listToArray(result);

      expect(resultArray).toHaveLength(2000);
      expect(resultArray).toEqual(Array.from({ length: 2000 }, (_, i) => i));
    });
  });
});
