import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export const TOKEN_KEY = "token";   // <- single source of truth

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return localStorage.getItem(TOKEN_KEY)
    ? children
    : <Navigate to="/login" replace />;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
}
