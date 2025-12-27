import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { validateEmail, validatePassword } from "../utils/validation";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!name) return setError("Name is required");
    if (!validateEmail(email)) return setError("Invalid email");
    if (!validatePassword(password))
      return setError("Password must be at least 6 characters");

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[560px] bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT */}
        <div className="w-1/2 bg-emerald-600 text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Create Account</h1>
          <p>Start your wellness journey today.</p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">Register</h2>

          {error && (
            <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 px-4 py-3 border rounded-lg"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 px-4 py-3 border rounded-lg"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
