import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Fitness App</h2>
      <ul>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/nutrition")}>Nutrition</li>
        <li onClick={() => navigate("/goals")}>Goals</li>
        <li className="logout" onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}
