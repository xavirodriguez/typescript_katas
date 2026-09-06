export type User = {
    name: string;
    email: string;
    token: string;
  };
  
  export type AuthState =
    | { tag: "Guest" }
    | { tag: "Authenticating" }
    | { tag: "Requires2FA"; email: string }
    | { tag: "Verifying2FA"; email: string }
    | { tag: "Authenticated"; user: User }
    | { tag: "Failure"; error: string; previousTag: "Guest" | "Requires2FA" };
  
  export type AuthAction =
    | { type: "SUBMIT_CREDENTIALS" }
    | { type: "REQUIRE_2FA"; email: string }
    | { type: "SUBMIT_2FA" }
    | { type: "LOGIN_SUCCESS"; user: User }
    | { type: "LOGIN_FAILED"; error: string }
    | { type: "RETRY" }
    | { type: "LOGOUT" };