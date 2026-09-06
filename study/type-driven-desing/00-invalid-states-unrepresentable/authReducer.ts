import { AuthState, AuthAction } from "./types";

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SUBMIT_CREDENTIALS":
      return { tag: "Authenticating" };

    case "REQUIRE_2FA":
      return { tag: "Requires2FA", email: action.email };

    case "SUBMIT_2FA":
      if (state.tag === "Requires2FA") {
        return { tag: "Verifying2FA", email: state.email };
      }
      return state;

    case "LOGIN_SUCCESS":
      return { tag: "Authenticated", user: action.user };

    case "LOGIN_FAILED":
      return {
        tag: "Failure",
        error: action.error,
        previousTag: state.tag === "Verifying2FA" ? "Requires2FA" : "Guest"
      };

    case "RETRY":
      if (state.tag === "Failure" && state.previousTag === "Requires2FA") {
        return { tag: "Requires2FA", email: "" };
      }
      return { tag: "Guest" };

    case "LOGOUT":
      return { tag: "Guest" };
  }
}