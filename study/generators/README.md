# Módulo: Funciones Generadoras y Evaluación Perezosa (`yield`) en TypeScript

## 1. Modelo Mental: Máquinas de Estados Finitos

Una función generadora no es solo una función que "pausa"; es una **máquina de estados suspendible** que implementa los protocolos nativos `Iterator` e `Iterable`.

* **Ejecución perezosa (*Lazy Evaluation*):** El código interno no se evalúa al invocar la función `fn()`, sino bajo demanda cada vez que se consume `.next()`.
* **Persistencia de contexto:** Mantiene intacto su pila de llamadas local (*stack frame*), variables locales, puntero de instrucción y estado de ejecución entre pausas.

En TypeScript ese protocolo se refleja en el tipo `Generator<Y, R, N>`: `Y` es lo que emite cada `yield`, `R` es el tipo de retorno final del generador, y `N` es lo que puede recibir a través de `next(valor)`. Para generadores asíncronos el equivalente es `AsyncGenerator<Y, R, N>`, que además implementa `AsyncIterable`.

---

## 2. Comunicación Bidireccional (`next(value)`)

El operador `yield` no solo emite valores hacia afuera; también actúa como un punto de entrada de datos hacia dentro de la función generadora.

```typescript
function* accumulator(): Generator<number, void, number | undefined> {
  let total = 0;
  while (true) {
    // 1. Pausa y emite 'total'
    // 2. Al reanudar, evalúa 'yield' como el argumento pasado en next(val)
    const input = yield total;
    if (input === undefined) break;
    total += input;
  }
}

const wallet = accumulator();
console.log(wallet.next());       // { value: 0, done: false } -> Arranca el generador
console.log(wallet.next(50));     // { value: 50, done: false } -> input = 50
console.log(wallet.next(30));     // { value: 80, done: false } -> input = 30
console.log(wallet.next());       // { value: undefined, done: true } -> Finaliza
```

* **Punto clave para alumnos:** el primer `.next()` inicia el generador hasta el primer `yield`. Los argumentos pasados en ese primer `.next(val)` son ignorados porque no hay ningún `yield` esperando recibir un valor.
* **Punto clave para TypeScript:** sin la anotación `Generator<number, void, number>`, TS no puede deducir el tipo de `input` a partir del cuerpo de la función y termina tipándolo de forma demasiado permisiva. La anotación explícita es la que hace que `next()` solo acepte `number | undefined` y que el editor marque error si alguien llama `wallet.next("50")`.

---

## 3. Delegación de Generadores (`yield*`)

Permite componer generadores reutilizando otros iterables (arreglos, cadenas o generadores secundarios) sin necesidad de recorrerlos manualmente con un bucle.

```typescript
interface TreeNode {
  val: number;
  children?: TreeNode[];
}

function* flatTree(node: TreeNode): Generator<number> {
  yield node.val;
  if (node.children) {
    for (const child of node.children) {
      yield* flatTree(child); // Delega el control del protocolo Iterator recursivamente
    }
  }
}
```

---

## 4. Control de Ciclo de Vida Avanzado: `.throw()` y `.return()`

El consumidor externo tiene el control total sobre la vida interna del generador mediante inyección de excepciones y cierres forzados.

```typescript
function* streamProcessor(): Generator<string, void, unknown> {
  try {
    yield "Conectando...";
    yield "Procesando datos...";
  } catch (error) {
    // En modo strict, TS tipa 'error' como unknown, no como Error.
    const message = error instanceof Error ? error.message : String(error);
    yield `Error capturado dentro del generador: ${message}`;
  } finally {
    // Se ejecuta SIEMPRE: al agotar el generador, al forzar .return(),
    // o al propagar una excepción no capturada.
    console.log("Limpieza de recursos/sockets completada.");
  }
}

const proc = streamProcessor();

console.log(proc.next().value);
// "Conectando..."

console.log(proc.throw(new Error("Timeout")));
// Reanuda dentro del catch interno:
// { value: "Error capturado dentro del generador: Timeout", done: false }

console.log(proc.return("cerrado manualmente"));
// No pasa por el catch: cierra el generador directamente y dispara el finally.
// Consola: "Limpieza de recursos/sockets completada."
// Resultado: { value: "cerrado manualmente", done: true }
```

`throw()` inyecta una excepción en el punto donde el generador está pausado; si hay un `try/catch` alrededor de ese punto, se captura ahí y el generador puede seguir produciendo valores. `return()` no pasa por ningún `catch`: cierra el generador de inmediato, ejecuta el `finally` si existe, y el valor que llega marcado con `done: true` es el que se le pasó a `return()`.

---

## 5. Casos de Uso Avanzados en Arquitectura de Software

| Caso de Uso | Problema que resuelve | Ejemplo Práctico |
| --- | --- | --- |
| **Procesamiento de Streams Masivos** | Evita desbordamientos de memoria RAM (*Out of Memory*) al leer archivos gigantescos o paginaciones. | Procesar un archivo CSV de 10GB línea por línea en lugar de cargarlo entero a un Array. |
| **Generación de Secuencias Infinitas** | Computación bajo demanda sin costo de memoria anticipado. | Generadores de IDs primarios (`UUID`), iteradores de Fibonacci o secuencias geométricas. |
| **Modelado de Corrutinas (Async/Await nativo)** | Permite escribir código asíncrono secuencial antes de la llegada de `async/await`. | Base de librerías como *Redux-Saga* o *co* para orquestación de efectos secundarios. |

---

Este ejercicio evalúa la capacidad del alumno para consumir una API con miles de registros paginados mediante **Async Generators** (`async function*`), procesando los elementos uno a uno con huella de memoria constante $O(1)$ sin cargar la totalidad del dataset en un array.

---
Aquí tienes la versión revisada de la **Sección 6**, ajustada con el bloque `try...finally` para demostrar la limpieza automática de recursos al cancelar el iterador, así como precisiones pedagógicas en el tipado y funcionamiento interno de TypeScript:

---

# 6. Enunciado del Ejercicio: Consumo Perezoso de APIs Paginadas (*Lazy API Fetcher*)

**Dificultad:** Avanzada

**Objetivo Pedagógico:** Evaluar la capacidad de consumir una API paginada con miles de registros mediante **Generadores Asíncronos** (`async function*`), manteniendo una huella de memoria constante $O(1)$ y gestionando de forma segura la liberación de recursos cuando la iteración se interrumpe de manera prematura.

### Escenario

El endpoint `/api/users` contiene 100,000 registros divididos en páginas de 100 elementos. Cargar todas las páginas en un array en memoria produce problemas de rendimiento o desbordamientos de pila (*Out of Memory*).

### Requisitos de la Solución:

1. Definir las interfaces `User` (con `id`, `name`, `isTarget`) y `PageResult` (con `data` y `nextPage`).
2. Implementar la función generadora asíncrona `fetchPaginatedUsers(pageSize)` tipada explícitamente como `AsyncGenerator<User, void void,>`.
3. Garantizar que la petición HTTP a la siguiente página **solo se realice cuando el consumidor haya terminado de procesar todos los elementos de la página actual**.
4. Incluir un bloque `try...finally` dentro del generador para demostrar la gestión de recursos (cierre de sockets, logs de cancelación, etc.).
5. Implementar un consumidor que procese los usuarios con `for await...of` e interrumpa el bucle con `break` en cuanto encuentre un usuario con `isTarget: true`.

> **Nota de entorno TS:** `async function*` y `for await...of` requieren la opción `"target": "es2018"` (o superior) y la librería `"lib": ["esnext.asynciterable", ...]` dentro de `tsconfig.json`.

---

### Código Base / Mock de la API (Entregado al alumno)

```typescript
interface User {
  id: number;
  name: string;
  isTarget: boolean;
}

interface PageResult {
  data: User[];
  nextPage: number | null;
}

// Simulación de API paginada remota
async function fetchUsersPage(page: number = 1, pageSize: number = 100): Promise<PageResult> {
  console.log(`[HTTP Request] Solicitando página ${page}...`);
  await new Promise((res) => setTimeout(res, 200)); // Latencia de red simulada

  const totalPages = 5;
  if (page > totalPages) return { data: [], nextPage: null };

  const data: User[] = Array.from({ length: pageSize }, (_, i) => ({
    id: (page - 1) * pageSize + i + 1,
    name: `User_${(page - 1) * pageSize + i + 1}`,
    isTarget: page === 2 && i === 15, // El elemento buscado está en la pág 2, ítem 16
  }));

  return {
    data,
    nextPage: page < totalPages ? page + 1 : null,
  };
}

```

---

### Solución Esperada

```typescript
// Generador Asíncrono con control de ciclo de vida mediante try...finally
async function* fetchPaginatedUsers(pageSize: number = 100): AsyncGenerator<User, void, void> {
  let currentPage: number | null = 1;

  try {
    while (currentPage !== null) {
      // 1. La petición a la red solo ocurre bajo demanda
      const { data, nextPage }: PageResult = await fetchUsersPage(currentPage, pageSize);

      // Opción A: Emitir elemento por elemento
      for (const user of data) {
        yield user;
      }

      // Opción B (Alternativa idiomática con yield*):
      // yield* data; 
      // Nota TS: 'yield*' dentro de un AsyncGenerator puede delegar en un Iterable síncrono (como User[])

      currentPage = nextPage;
    }
  } finally {
    // 2. Garantía de limpieza: Se ejecuta tanto al agotar las páginas 
    // como si el consumidor cancela la iteración con un 'break' o 'return'.
    console.log("[Cleanup] Generador finalizado o cancelado. Conexiones/Recursos liberados.");
  }
}

// Consumidor con interrupción anticipada
async function processData(): Promise<void> {
  console.log("Iniciando procesamiento...");

  for await (const user of fetchPaginatedUsers(100)) {
    if (user.isTarget) {
      console.log(`🎯 Usuario objetivo encontrado:`, user);
      
      // Al hacer 'break', JS llama internamente a iterador.return(), 
      // lo que dispara el bloque 'finally' dentro de fetchPaginatedUsers 
      // y evita solicitar las páginas 3, 4 y 5.
      break; 
    }
  }

  console.log("Procesamiento finalizado.");
}

processData();

```

---

### Salida Esperada por Consola

```text
Iniciando procesamiento...
[HTTP Request] Solicitando página 1...
[HTTP Request] Solicitando página 2...
🎯 Usuario objetivo encontrado: { id: 116, name: 'User_116', isTarget: true }
[Cleanup] Generador finalizado o cancelado. Conexiones/Recursos liberados.
Procesamiento finalizado.

```
