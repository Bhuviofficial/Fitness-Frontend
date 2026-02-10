import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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

  const [stats, setStats] = useState({
    stepsToday: 0,
    caloriesToday: 0,
    water: 0,
    workout: 0,
  });

  const [weeklySteps, setWeeklySteps] = useState([]);
  const [weeklyCalories, setWeeklyCalories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          throw new Error("Session expired");
        }

        const data = await res.json();

        setStats(data.stats || stats);
        setWeeklySteps(data.weeklySteps || []);
        setWeeklyCalories(data.weeklyCalories || []);
      } catch (err) {
        setError("Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <p>Loading dashboard...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-box">
          <p>{error}</p>
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

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
        data: weeklySteps,
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
        data: weeklyCalories,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.25)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <Layout>
      {/* HEADER */}
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
    </Layout>
  );
};

export default Dashboard;
