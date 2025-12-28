import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">FitLife</h2>

        <nav className="sidebar-menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Nutrition</button>
          <button className="menu-item">Goals</button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome */}
        <section className="welcome-card">
          <h2>
            Welcome back <span>👋</span>
          </h2>
          <p>Your fitness summary for today</p>
        </section>

        {/* Stats */}
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
