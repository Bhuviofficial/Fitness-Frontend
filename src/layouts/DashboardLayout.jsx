import { useNavigate, useLocation, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="sidebar-logo">FitLife</h2>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`menu-item ${isActive("/nutrition") ? "active" : ""}`}
            onClick={() => navigate("/nutrition")}
          >
            Nutrition
          </button>

          <button
            className={`menu-item ${isActive("/goals") ? "active" : ""}`}
            onClick={() => navigate("/goals")}
          >
            Goals
          </button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
