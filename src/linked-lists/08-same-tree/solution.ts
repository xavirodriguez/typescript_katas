export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const compare = (n1: TreeNode, n2: TreeNode) => {
  if (n1.val == n2.val) {
    if (n1.left && n2.left) {
      const result = compare(n1.left, n2.left);
      if (!result) {
        return false;
      }
    }
    if (n1.right && n2.right) {
      const result = compare(n1.right, n2.right);
      if (!result) {
        return false;
      }
    }

    if ((n1.left == null && n2.left != null) || (n1.left != null && n2.left == null)) {
      return false;
    }
    if ((n1.right == null && n2.right != null) || (n1.right != null && n2.right == null)) {
      return false;
    }
  } else {
    return false;
  }

  return true;
};

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (q != null && p != null) {
    return compare(q, p);
  } else {
    return false;
  }
}

/*
Casos Edge a Considerar

Ambos árboles vacíos: Deben considerarse iguales
Un árbol vacío, otro no: Deben considerarse diferentes
Árboles con un solo nodo: Comparar solo el valor del nodo raíz
Árboles desbalanceados: La estructura debe coincidir exactamente
*/
