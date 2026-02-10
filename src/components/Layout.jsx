import { useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">FitLife</h2>

        <nav className="sidebar-menu">
          <button className={`menu-item ${isActive("/dashboard") ? "active" : ""}`} onClick={() => navigate("/dashboard")}>
            📊 Dashboard
          </button>
          <button className={`menu-item ${isActive("/nutrition") ? "active" : ""}`} onClick={() => navigate("/nutrition")}>
            🥗 Nutrition
          </button>
          <button className={`menu-item ${isActive("/goals") ? "active" : ""}`} onClick={() => navigate("/goals")}>
            🎯 Goals
          </button>
          <button className={`menu-item ${isActive("/exercise") ? "active" : ""}`} onClick={() => navigate("/exercise")}>
            🏋️ Exercise
          </button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
