import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>FitLife</h2>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
