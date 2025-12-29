import { useNavigate, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [6000, 7200, 8000, 7500, 9000, 10000, 8500],
        borderColor: "#00c6a9",
        backgroundColor: "rgba(0,198,169,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories",
        data: [400, 480, 520, 500, 600, 700, 650],
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

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
            📊 Dashboard
          </button>

          <button
            className={`menu-item ${isActive("/nutrition") ? "active" : ""}`}
            onClick={() => navigate("/nutrition")}
          >
            🥗 Nutrition
          </button>

          <button
            className={`menu-item ${isActive("/goals") ? "active" : ""}`}
            onClick={() => navigate("/goals")}
          >
            🎯 Goals
          </button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome */}
        <section className="welcome-card">
          <h2>Welcome back 👋</h2>
          <p>Your weekly fitness overview</p>
        </section>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Steps</h3>
            <p className="stat-value">7,500</p>
            <span className="stat-unit">today</span>
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

        {/* Charts */}
        <section className="charts-grid">
          <div className="chart-card">
            <h3>Weekly Steps</h3>
            <Line data={stepsData} options={chartOptions} />
          </div>

          <div className="chart-card">
            <h3>Calories Burned</h3>
            <Line data={caloriesData} options={chartOptions} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
