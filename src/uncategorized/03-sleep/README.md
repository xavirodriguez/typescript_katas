# 2621. Sleep

**Difficulty**: Easy
**Topics**: JavaScript, Promise


---


## Problem Statement

Dada un entero positivo `millis`, escribe una función asíncrona que se detenga durante `millis` milisegundos. Puede resolver con cualquier valor.

Ten en cuenta que una pequeña desviación de `millis` en la duración real de la pausa es aceptable.

### Ejemplo 1:

**Input:** `millis = 100`
**Output:** `100`
**Explicación:** Debería devolver una promesa que se resuelve después de 100ms.

```javascript
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

### Ejemplo 2:

**Input:** `millis = 200`
**Output:** `200`
**Explicación:** Debería devolver una promesa que se resuelve después de 200ms.


---


### Restricciones:

- `1 <= millis <= 1000`


---


## Solución en TypeScript

La forma más común y directa de implementar una función `sleep` en JavaScript/TypeScript es utilizando `setTimeout` dentro de una `Promise`. La función `async` se encargará de devolver implícitamente una promesa.

### Enfoque 1: `async`/`await` con `Promise`

Este enfoque es moderno, legible y el más recomendado.

```typescript
async function sleep(millis: number): Promise<void> {
  // Devolvemos una nueva Promesa.
  // El constructor de la Promesa toma una función con un argumento `resolve`.
  await new Promise((resolve) => {
    // setTimeout ejecutará la función `resolve` después de `millis` milisegundos.
    setTimeout(resolve, millis);
  });
}

/**
 * Ejemplo de uso:
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
```

**Explicación del código:**

1.  La función se declara como `async`, lo que asegura que siempre devolverá una `Promise`.
2.  `new Promise(resolve => ...)` crea una nueva promesa. El código dentro del constructor se ejecuta inmediatamente.
3.  `setTimeout(resolve, millis)` agenda la llamada a la función `resolve` para que se ejecute después de que hayan transcurrido `millis` milisegundos.
4.  La palabra clave `await` pausa la ejecución de la función `sleep` hasta que la promesa creada con `new Promise` se resuelva.
5.  Una vez que `setTimeout` invoca a `resolve()`, la promesa se cumple y la función `sleep` puede finalizar su ejecución, cumpliendo así la promesa que `async` creó implícitamente.

### Enfoque 2: Devolviendo la Promesa directamente

Esta versión es funcionalmente idéntica pero omite el uso de `async`/`await` dentro de la propia función, ya que no es estrictamente necesario.

```typescript
function sleepWithoutAsync(millis: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

/**
 * Ejemplo de uso:
 * let t = Date.now()
 * sleepWithoutAsync(100).then(() => console.log(Date.now() - t)) // 100
 */
```

Ambas soluciones son correctas y cumplen con los requisitos del problema. La primera (`async`/`await`) suele ser preferida por su legibilidad en contextos asíncronos más complejos.


---


## Complexity

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
