import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* App Title */}
      <h1 className="text-xl font-semibold text-green-600">
        Health & Wellness
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
