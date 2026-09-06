import React from "react";
import { authReducer } from "./authReducer";
import { AuthState } from "./types";
import { mockApi } from "./mockApi";

const initialState: AuthState = { tag: "Guest" };

export function useAuth() {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const login = async (email: string, pass: string) => {
    dispatch({ type: "SUBMIT_CREDENTIALS" });
    try {
      const res = await mockApi.login(email, pass);
      if (res.requires2FA) {
        dispatch({ type: "REQUIRE_2FA", email });
      } else if (res.user) {
        dispatch({ type: "LOGIN_SUCCESS", user: res.user });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", error: (err as Error).message });
    }
  };

  const verifyPIN = async (email: string, pin: string) => {
    dispatch({ type: "SUBMIT_2FA" });
    try {
      const user = await mockApi.verify2FA(email, pin);
      dispatch({ type: "LOGIN_SUCCESS", user });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", error: (err as Error).message });
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });
  const retry = () => dispatch({ type: "RETRY" });

  return { state, login, verifyPIN, logout, retry };
}