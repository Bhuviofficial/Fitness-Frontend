import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <header className="dashboard-navbar">
        <h1 className="logo">FitLife</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="welcome-card">
        <h2>
          Welcome back <span>👋</span>
        </h2>
        <p>Here’s your fitness summary for today</p>
      </section>

      {/* Stats Grid */}
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
    </div>
  );
};

export default Dashboard;
