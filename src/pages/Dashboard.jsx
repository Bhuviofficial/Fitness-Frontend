import { useEffect, useState } from "react";
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

  const [stats, setStats] = useState(null);
  const [steps, setSteps] = useState([]);
  const [calories, setCalories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await res.json();

        setStats(data.stats);
        setSteps(data.weeklySteps);
        setCalories(data.weeklyCalories);
      } catch (err) {
        setError("Server error. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  /* ================= UI STATES ================= */
  if (loading) {
    return <div className="auth-page">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="auth-page">{error}</div>;
  }

  /* ================= CHART CONFIG ================= */
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: steps,
        borderColor: "#00c6a9",
        backgroundColor: "rgba(0,198,169,0.25)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: calories,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.25)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  /* ================= UI ================= */
  return (
    <div className="app-layout">
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="main-content">
        <section className="welcome-card">
          <h2>Welcome back 👋</h2>
          <p>Your weekly fitness overview</p>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Steps</h3>
            <p className="stat-value">{stats.stepsToday}</p>
            <span className="stat-unit">today</span>
          </div>

          <div className="stat-card">
            <h3>Calories</h3>
            <p className="stat-value">{stats.caloriesToday}</p>
            <span className="stat-unit">kcal</span>
          </div>

          <div className="stat-card">
            <h3>Water</h3>
            <p className="stat-value">{stats.water}</p>
            <span className="stat-unit">litres</span>
          </div>

          <div className="stat-card">
            <h3>Workout</h3>
            <p className="stat-value">{stats.workout}</p>
            <span className="stat-unit">minutes</span>
          </div>
        </section>

        {/* CHARTS */}
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
