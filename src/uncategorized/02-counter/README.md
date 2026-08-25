# Counter

## Descripción

Dado un entero `n`, retorna una función contador. Esta función contador inicialmente devuelve `n` y luego devuelve 1 más que el valor anterior cada vez que se la llama (`n`, `n + 1`, `n + 2`, etc.).

---

### Ejemplo 1:

**Entrada:**
```javascript
n = 10
["call","call","call"]
```

**Salida:**
```javascript
[10,11,12]
```

**Explicación:**
```javascript
counter() = 10 // La primera vez que se llama a counter(), devuelve n.
counter() = 11 // Devuelve 1 más que la vez anterior.
counter() = 12 // Devuelve 1 más que la vez anterior.```

---

### Ejemplo 2:

**Entrada:**
```javascript
n = -2
["call","call","call","call","call"]
```

**Salida:**
```javascript
[-2,-1,0,1,2]
```

**Explicación:**
`counter()` inicialmente devuelve -2. Luego se incrementa después de cada llamada subsecuente.

---

### Restricciones:

*   `-1000 <= n <= 1000`
*   `0 <= calls.length <= 1000`
*   `calls[i] === "call"`