import { AuthState, AuthAction } from "./types";
import { authReducer } from "./authReducer";

export class AuthStore {
  private state: AuthState = { tag: "Guest" };
  private listeners: Array<(state: AuthState) => void> = [];

  getState(): AuthState {
    return this.state;
  }

  dispatch(action: AuthAction): void {
    this.state = authReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}