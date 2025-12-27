import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <button
        onClick={logout}
        className="text-sm bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Logout
      </button>
    </header>
  );
}
