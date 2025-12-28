import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      {/* Sidebar */}
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

      {/* Main */}
      <main className="main-content">
        <section className="welcome-card">
          <h2>Welcome back 👋</h2>
          <p>Your fitness summary for today</p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Steps</h3>
            <p className="stat-value">7,500</p>
            <span className="stat-unit">steps</span>
          </div>

          <div className="stat-card">
            <h3>Calories</h3>
            <p className="stat-value">520</p>
            <span className="stat-unit">kcal</span>
          </div>

          <div className="stat-card">
            <h3>Water</h3>
            <p className="stat-value">2.5</p>
            <span className="stat-unit">litres</span>
          </div>

          <div className="stat-card">
            <h3>Workout</h3>
            <p className="stat-value">45</p>
            <span className="stat-unit">minutes</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
