import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { validateEmail } from "../utils/validation";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!validateEmail(email)) {
      return setError("Enter a valid email address");
    }

    if (!password) {
      return setError("Password is required");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[520px] bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT */}
        <div className="w-1/2 bg-emerald-600 text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Health & Wellness</h1>
          <p className="text-lg">
            Track fitness, nutrition & wellness securely.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">Sign in</h2>

          {error && (
            <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-emerald-600 font-semibold cursor-pointer"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
