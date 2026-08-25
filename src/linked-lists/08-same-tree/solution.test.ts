import { isSameTree, TreeNode } from './solution';

describe('isSameTree', () => {
  // Helper function para crear árboles más fácilmente
  const createTree = (values: (number | null)[]): TreeNode | null => {
    if (values.length === 0 || values[0] === null) return null;

    const root = new TreeNode(values[0]);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
      const node = queue.shift()!;

      if (i < values.length && values[i] !== null) {
        node.left = new TreeNode(values[i]!);
        queue.push(node.left);
      }
      i++;

      if (i < values.length && values[i] !== null) {
        node.right = new TreeNode(values[i]!);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  };

  test('should return true for identical trees - Example 1', () => {
    // Arrange
    const p = createTree([1, 2, 3]);
    const q = createTree([1, 2, 3]);

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(true);
  });

  test('should return false for trees with different structures - Example 2', () => {
    // Arrange
    const p = createTree([1, 2]); // Tree: 1 -> left: 2
    const q = createTree([1, null, 2]); // Tree: 1 -> right: 2

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(false);
  });

  test('should return false for trees with same values but different positions - Example 3', () => {
    // Arrange
    const p = createTree([1, 2, 1]); // Tree: 1 -> left: 2, right: 1
    const q = createTree([1, 1, 2]); // Tree: 1 -> left: 1, right: 2

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(false);
  });

  // Test adicional: árboles vacíos
  test('should return true for both empty trees', () => {
    // Arrange
    const p = null;
    const q = null;

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(true);
  });

  // Test adicional: un árbol vacío vs árbol con nodos
  test('should return false when one tree is empty and other is not', () => {
    // Arrange
    const p = createTree([1]);
    const q = null;

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(false);
  });

  // Test adicional: árboles con un solo nodo
  test('should return true for single node trees with same value', () => {
    // Arrange
    const p = createTree([5]);
    const q = createTree([5]);

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(true);
  });

  test('should return false for single node trees with different values', () => {
    // Arrange
    const p = createTree([5]);
    const q = createTree([3]);

    // Act
    const result = isSameTree(p, q);

    // Assert
    expect(result).toBe(false);
  });
});
