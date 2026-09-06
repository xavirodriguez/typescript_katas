import { User } from "./types";

export const mockApi = {
  async login(email: string, pass: string): Promise<{ requires2FA: boolean; user?: User }> {
    await new Promise((r) => setTimeout(r, 400));
    if (pass !== "1234") throw new Error("Credenciales incorrectas");
    if (email.startsWith("2fa")) return { requires2FA: true };
    return { requires2FA: false, user: { name: "Alex", email, token: "tok_123" } };
  },

  async verify2FA(email: string, pin: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 400));
    if (pin !== "0000") throw new Error("PIN inválido");
    return { name: "Alex", email, token: "tok_123" };
  }
};