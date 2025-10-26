// src/pages/Login.tsx
import { useState, type FormEvent } from "react";

interface PatientLoginProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
}

export default function PatientLogin({ onLogin, error }: PatientLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    onLogin(email, password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 w-[350px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">Patient Login</h1>

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

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

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
