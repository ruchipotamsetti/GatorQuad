// src/pages/Dashboard.tsx
import { logout } from "../ProtectedRoute"; // optional helper

export default function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome!</h1>
      <p>You are logged in.</p>

      <button
        style={{
          marginTop: "16px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#6c63ff",
          color: "white",
          cursor: "pointer"
        }}
        onClick={logout} // ✅ clean logout call
      >
        Logout
      </button>
    </div>
  );
}
