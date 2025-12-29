import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="auth-page">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="auth-page">{error}</div>;
  }

  /* ---------- CHART DATA ---------- */

  const stepsChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: dashboardData.steps,
        borderColor: "#00c6a9",
        backgroundColor: "rgba(0,198,169,0.25)",
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }
    ]
  };

  const caloriesChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned",
        data: dashboardData.calories,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.25)",
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      }
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Fitness Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Steps Today</h3>
          <p className="stat-value">{dashboardData.stats.stepsToday}</p>
        </div>

        <div className="stat-card">
          <h3>Calories</h3>
          <p className="stat-value">{dashboardData.stats.caloriesToday}</p>
        </div>

        <div className="stat-card">
          <h3>Water (L)</h3>
          <p className="stat-value">{dashboardData.stats.water}</p>
        </div>

        <div className="stat-card">
          <h3>Workout (min)</h3>
          <p className="stat-value">{dashboardData.stats.workout}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Steps</h3>
          <Line data={stepsChart} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Calories Burned</h3>
          <Line data={caloriesChart} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
