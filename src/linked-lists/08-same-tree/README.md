# 100. Same Tree

**Difficulty**: Easy
**Topics**: Tree, Depth-First Search, Binary Tree, Recursion

---

## Problem Statement

## Descripción del Problema

Dado las raíces de dos árboles binarios `p` y `q`, escribe una función para verificar si son iguales o no.

Dos árboles binarios se consideran iguales si son estructuralmente idénticos y los nodos tienen el mismo valor.

## Ejemplos

### Ejemplo 1: Árboles Idénticos

```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Visualización:**

```
Árbol p:           Árbol q:
    1                  1
   / \                / \
  2   3              2   3
```

**Explicación:** Ambos árboles tienen la misma estructura y los mismos valores en cada posición correspondiente.

### Ejemplo 2: Estructuras Diferentes

```
Input: p = [1,2], q = [1,null,2]
Output: false
```

**Visualización:**

```
Árbol p:           Árbol q:
    1                  1
   /                    \
  2                      2
```

**Explicación:** Aunque ambos árboles tienen los mismos valores (1 y 2), sus estructuras son diferentes. En el árbol `p`, el nodo 2 es hijo izquierdo del nodo 1, mientras que en el árbol `q`, el nodo 2 es hijo derecho del nodo 1.

### Ejemplo 3: Mismos Valores, Diferente Orden

```
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

**Visualización:**

```
Árbol p:           Árbol q:
    1                  1
   / \                / \
  2   1              1   2
```

**Explicación:** Ambos árboles tienen los mismos valores (1, 2, 1), pero están distribuidos de manera diferente en la estructura del árbol.

## Restricciones

- El número de nodos en ambos árboles está en el rango `[0, 100]`
- `-10^4 <= Node.val <= 10^4`

---

## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(h)

---

## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
