// src/pages/Login.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Demo check — change to your needs or wire to an API
    const ok = (email === "demo@example.com" && password === "password123");
    // e.g. for your UFL email, change the condition above.

    setTimeout(() => {
      if (ok) {
        localStorage.setItem("token", "demo_token");
        navigate("/", { replace: true });   // ⬅️ was "/dashboard"
        return;
        // navigate("/dashboard");
      } else {
        setErr("Invalid credentials");
      }
      setLoading(false);
    }, 300); // just to show button loading
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 w-[350px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input className="mt-1 w-full border rounded-md p-2" type="email"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input className="mt-1 w-full border rounded-md p-2" type="password"
                 value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
