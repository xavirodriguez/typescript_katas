# Closures y Encapsulamiento de Estado (`Counter` & `Once`)

Un closure permite a una función recordar y acceder a sus variables del ámbito exterior incluso después de que dicha función exterior haya terminado de ejecutarse.

**1. Encapsulamiento de Estado Privado (Patrón Módulo)**
Demuestra cómo proteger variables del *scope* global sin recurrir a sintaxis de clases con campos privados (`#`).

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Variable privada atrapada en el closure

  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Fondos insuficientes';
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);          // 150
console.log(account.balance); // undefined (el estado externo no puede alterarlo)

```

* **Punto pedagógico:** El entorno léxico de `createBankAccount` permanece vivo en memoria porque los métodos devueltos mantienen referencias a `balance`.

---

**2. Fábrica de Funciones (Configuración de Comportamiento)**
Muestra cómo generar funciones especializadas que recuerdan parámetros de configuración en el ámbito de la función contenedora.

```javascript
function createLogger(prefix) {
  return function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${prefix.toUpperCase()}]: ${message}`);
  };
}

const logError = createLogger('Database');
const logAuth = createLogger('Auth');

logError('Conexión perdida con el host'); // [2026-08-26...] [DATABASE]: Conexión perdida...
logAuth('Usuario autenticado con éxito'); // [2026-08-26...] [AUTH]: Usuario autenticado...

```

* **Punto pedagógico:** Ilustra cómo la función interna `log` accede a `prefix` mucho después de que `createLogger` haya finalizado su ejecución.

---

**3. Memoización (Optimización de Rendimiento)**
Un ejemplo de Función de Orden Superior (HOF) donde el *closure* actúa como una memoria caché interna para evitar cómputos repetidos.

```javascript
function memoize(fn) {
  const cache = {}; // El objeto cache vive de forma persistente en el closure

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key]; // Devuelve el resultado cacheado
    }
    
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Ejemplo de uso con un cálculo costoso
const expensiveSum = memoize((a, b) => {
  return a + b;
});

expensiveSum(10, 20); // Computa y guarda en cache
expensiveSum(10, 20); // Retorna directamente desde el closure

```

Aquí tienes una propuesta completa de ejercicio pedagógico diseñado para un nivel avanzado. Incluye el enunciado para los alumnos, el código con el *bug*, la explicación técnica detallada y dos soluciones (una moderna y una clásica) para evaluar el grado de dominio de los estudiantes.

---

### Ejercicio

> **Título:** Depuración del Registro de callbacks en bucles
> **Dificultad:** Intermedia - Avanzada
> **Descripción:**
> Un desarrollador junior intentó construir un generador de callbacks para registrar manejadores de eventos de una lista de botones. Sin embargo, al probar las funciones devueltas, nota que **todas imprimen el mismo valor final (el número 3)** en lugar del índice correspondiente (0, 1 y 2).
> **Tu tarea:**
> 1. Identifica y explica exactamente **por qué** ocurre este comportamiento a nivel de ámbito léxico (*lexical scope*) y *closures*.
> 2. Proporciona la solución moderna utilizando la sintaxis de ES6.
> 3. Proporciona una solución alternativa sin modificar el ámbito de la variable del bucle (es decir, manteniendo `var`), obligándote a crear un *closure* explícito para fijar el estado de cada iteración.
> 
> 

---

### Código Erróneo de Origen

```javascript
function setupButtons() {
  var handlers = [];

  for (var i = 0; i < 3; i++) {
    handlers.push(function () {
      console.log(`Botón ${i} activado`);
    });
  }

  return handlers;
}

const buttons = setupButtons();
buttons[0](); // Imprime: "Botón 3 activado" (Esperado: "Botón 0 activado")
buttons[1](); // Imprime: "Botón 3 activado" (Esperado: "Botón 1 activado")
buttons[2](); // Imprime: "Botón 3 activado" (Esperado: "Botón 2 activado")

```

---

### Explicación del Error (Criterios de Respuesta del Alumno)

El problema radica en la interacción entre el **ámbito de función de `var**` y el funcionamiento de los **closures**:

1. **Ámbito único:** La variable `var i` tiene ámbito de función (`setupButtons`), no ámbito de bloque. Por lo tanto, existe **únicamente una variable `i**` compartida en toda la ejecución de la función.
2. **Referencia por closure, no por valor:** Cada función anónima agregada al array `handlers` captura una **referencia** a esa variable única `i` en su entorno léxico externo, no una copia de su valor en el momento de la iteración.
3. **Estado final al ejecutar:** Cuando el bucle termina, `i` vale `3`. Cuando los callbacks son invocados posteriormente (`buttons[0]()`), leen el valor actual de la variable referenciada en su *closure*, que ya se ha incrementado a `3`.

---

### Soluciones Esperadas

#### Solución 1: Ámbito de Bloque con `let` (Enfoque Moderno ES6+)

```javascript
function setupButtons() {
  const handlers = [];

  // 'let' crea un nuevo binding de 'i' para cada iteración del bucle
  for (let i = 0; i < 3; i++) {
    handlers.push(function () {
      console.log(`Botón ${i} activado`);
    });
  }

  return handlers;
}

```

* **Por qué funciona:** Con `let`, JavaScript crea un nuevo ámbito de bloque (*block scope*) por cada iteración del bucle `for`. Cada función interna captura la variable `i` de **su propio ámbito de iteración**, conservando su valor individual.

---

#### Solución 2: Closure Explícito con IIFE (Enfoque Tradicional pre-ES6)

```javascript
function setupButtons() {
  var handlers = [];

  for (var i = 0; i < 3; i++) {
    // IIFE (Immediately Invoked Function Expression) que atrapa 'i' por valor
    (function (index) {
      handlers.push(function () {
        console.log(`Botón ${index} activado`);
      });
    })(i);
  }

  return handlers;
}

```

* **Por qué funciona:** La IIFE crea un nuevo ámbito de función en cada iteración. El valor actual de `i` se pasa como argumento al parámetro `index`. El callback interno forma su *closure* sobre `index` (que es único para esa ejecución de la IIFE) y no sobre `i`.
