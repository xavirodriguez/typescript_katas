import { AuthState } from "./types";
import { AuthStore } from "./store";
import { mockApi } from "./mockApi";

function render(state: AuthState): void {
  switch (state.tag) {
    case "Guest":
      console.log("🟢 [Vista: Login] Esperando credenciales...");
      break;
    case "Authenticating":
      console.log("⏳ [Cargando] Validando usuario y contraseña...");
      break;
    case "Requires2FA":
      console.log(`🟡 [Vista: 2FA] Introduzca PIN para ${state.email}`);
      break;
    case "Verifying2FA":
      console.log("⏳ [Cargando] Verificando PIN...");
      break;
    case "Authenticated":
      console.log(`🎉 [Vista: Dashboard] Sesión activa para ${state.user.name}`);
      break;
    case "Failure":
      console.log(`🔴 [Vista: Error] ${state.error}`);
      break;
    default: {
      const _exhaustiveCheck: never = state;
      throw new Error(`Estado no manejado: ${_exhaustiveCheck}`);
    }
  }
}

async function runSimulation() {
  const store = new AuthStore();
  store.subscribe(render);

  render(store.getState());

  // Simulación: Login con 2FA
  store.dispatch({ type: "SUBMIT_CREDENTIALS" });
  
  try {
    const res = await mockApi.login("2fa@test.com", "1234");
    if (res.requires2FA) {
      store.dispatch({ type: "REQUIRE_2FA", email: "2fa@test.com" });
    }
  } catch (err) {
    store.dispatch({ type: "LOGIN_FAILED", error: (err as Error).message });
  }

  // Simulación: Enviar PIN 2FA
  store.dispatch({ type: "SUBMIT_2FA" });
  try {
    const user = await mockApi.verify2FA("2fa@test.com", "0000");
    store.dispatch({ type: "LOGIN_SUCCESS", user });
  } catch (err) {
    store.dispatch({ type: "LOGIN_FAILED", error: (err as Error).message });
  }
}

runSimulation();