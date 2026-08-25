# TypeScript Katas

> Una colección de katas de programación en TypeScript, organizadas por categoría, pensada para practicar/repasar algoritmos y estructuras de datos — y para usarse como material de enseñanza.

## Tabla de contenidos

- [¿Por qué este repo?](#por-qué-este-repo)
- [Quickstart](#quickstart)
- [Estructura de una kata](#estructura-de-una-kata)
- [Formato estándar del README de kata](#formato-estándar-del-readme-de-kata)
- [Índice de katas](#índice-de-katas)
- [Cómo añadir una nueva kata](#cómo-añadir-una-nueva-kata)
- [Licencia](#licencia)

## ¿Por qué este repo?

Este repositorio nació como espacio de repaso personal de algoritmos y estructuras de datos, y evolucionó para servir también como material didáctico: cada kata combina un enunciado claro, una solución en TypeScript y tests con `vitest`, siguiendo una convención de carpetas consistente que facilita tanto resolver ejercicios nuevos como revisar soluciones ya hechas.

## Quickstart

```bash
npm install

# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch mientras resuelves una kata
npm run test:watch

# Verificar tipos sin compilar
npm run typecheck

# Lint
npm run lint
npm run lint:fix
```

## Estructura de una kata

Cada kata vive en `src/<categoria>/<NN-nombre-kata>/` y contiene:

- `README.md`: enunciado del problema (metadatos, descripción, ejemplos, restricciones, complejidad esperada y enlaces a solución/tests).
- `solution.ts` (o `solution-a.ts` / `solution-b.ts` si hay varias variantes): implementación.
- `solution.test.ts`: tests correspondientes.

## Formato estándar del README de kata

Para mantener la consistencia entre todos los ejercicios, cada `README.md` de kata sigue la siguiente plantilla estructurada:

```markdown
# <Número LeetCode si aplica>. <Título>

**Difficulty**: <Easy|Medium|Hard>
**Topics**: <Técnica 1>, <Técnica 2>

---

## Problem Statement
...
## Examples
...
## Constraints
...

---

## Complexity

- **Time Complexity**: O(...)
- **Space Complexity**: O(...)

---

## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
```

## Cómo añadir una nueva kata

1. Crea una carpeta `src/<categoria>/<NN-nombre-kata>/`.
2. Añade `README.md` siguiendo el [formato estándar](#formato-estándar-del-readme-de-kata).
3. Implementa la solución en `solution.ts`.
4. Añade los tests en `solution.test.ts`.
5. Corre `npm run test` y `npm run typecheck` antes de dar por terminada la kata.

## Licencia

Ver `package.json` (`"license": "ISC"`).
