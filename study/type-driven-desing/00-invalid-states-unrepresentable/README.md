# Kata: El Flujo de Autenticación con 2FA

Imagina que estás construyendo la pantalla de login para una app del banco. El flujo es un poco más complejo que un simple "cargando/éxito":

1. El usuario empieza sin estar autenticado.
2. Introduce su email/password y le da a enviar (estado de carga).
3. El servidor responde: ¡Contraseña correcta! Pero esta cuenta tiene **Autenticación en 2 Pasos (2FA)**. Ahora necesitamos pedirle un código PIN.
4. El usuario envía el PIN (otro estado de carga).
5. El servidor responde con éxito: Aquí tienes los datos del `User`.

### El Antipatrón (Lo que queremos evitar)

Si un programador junior modelara esto con tipos producto (booleanos), haría algo así:

```typescript
// ❌ EL MODELO PELIGROSO
type AuthState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  requires2FA: boolean;
  tempEmailFor2FA?: string; // Solo tiene sentido si requires2FA es true
  user?: { name: string; token: string }; // Solo tiene sentido si está logueado
};

```

Con este modelo, el compilador permite atrocidades como `isLoading: true, requires2FA: true, user: { ... }`. ¡No tiene sentido!

---

## Tu Misión

Tu objetivo es refactorizar este estado usando **Tipos Suma** y un **Reducer** puro.

Te voy a dar el esqueleto. Intenta completarlo pensando en la regla de oro: *"Cada estado debe tener estrictamente los datos que necesita, y nada más".*

### Paso 1: Modela el Estado (El tipo suma)

Define las 4 o 5 formas exactas en las que puede estar la pantalla.

```typescript
type User = { name: string; token: string };

// 🛠️ TAREA 1: Completa el tipo AuthState usando una unión discriminada
type AuthState = 
  // | { tag: "Guest" } 
  // | { ... } // ¿Cómo es el estado cuando validas credenciales?
  // | { ... } // ¿Cómo es el estado cuando esperas el PIN? (Pista: necesita guardar el email temporal)
  // | { ... } // ¿Cómo es el éxito?
  // | { ... } // ¿Cómo es el error?

```

### Paso 2: Modela las Acciones

Define qué eventos pueden ocurrir que hagan cambiar el estado.

```typescript
// 🛠️ TAREA 2: Completa las acciones
type AuthAction =
  | { type: "SUBMIT_CREDENTIALS" }
  | { type: "REQUIRE_2FA"; email: string }
  // | { type: ... } // El usuario envía el PIN
  // | { type: ... } // El login triunfó
  // | { type: ... } // Hubo un error
  | { type: "LOGOUT" };

```

### Paso 3: El Reducer

Escribe la función que procesa la transición de un estado a otro.

```typescript
// 🛠️ TAREA 3: Implementa el reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SUBMIT_CREDENTIALS":
      return { /* ... */ };
    case "REQUIRE_2FA":
      return { /* ... */ }; // Aquí debes guardar el email que viene en la acción
    
    // Completa el resto de casos...
    
    case "LOGOUT":
      return { tag: "Guest" };
  }
}

```

### Paso 4: La Vista (Exhaustividad)

Imagina el componente de React. Usa el `switch` para renderizar algo distinto en cada caso.

```tsx
// 🛠️ TAREA 4: Completa el switch de la vista
function LoginScreen({ state }: { state: AuthState }) {
  switch (state.tag) {
    case "Guest":
      return <LoginForm />;
      
    // case "???":
    //   return <Spinner text="Validando..." />
      
    // case "???":
    //   // Fíjate que aquí el autocompletado te debe dejar leer state.email
    //   return <TwoFactorForm email={state.email} />
      
    // case "???":
    //   return <Dashboard user={state.user} />
      
    // case "???":
    //   return <ErrorAlert message={state.error} />
      
    default:
      const _exhaustive: never = state;
      return null;
  }
}

```

---

**Reglas para este ejercicio:**

* Intenta resolverlo mentalmente o en tu editor de código favorito.
* Observa cómo, al modelarlo así, es **imposible** intentar pintar el `Dashboard` si no tienes un `User`, o renderizar el formulario 2FA si no tienes el `email`.