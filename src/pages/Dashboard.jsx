import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
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

  const [weeklySteps, setWeeklySteps] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [weeklyCalories, setWeeklyCalories] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        setStats(data.stats || {});
        setWeeklySteps(data.weeklySteps || [0,0,0,0,0,0,0]);
        setWeeklyCalories(data.weeklyCalories || [0,0,0,0,0,0,0]);
      } catch {
        setError("Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) return <div className="auth-page">Loading dashboard...</div>;

  if (error)
    return (
      <div className="auth-page">
        <p>{error}</p>
        <button className="primary-btn" onClick={() => navigate("/login")}>
          Login again
        </button>
      </div>
    );

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <Layout>
      <section className="welcome-card">
        <h2>Welcome back 👋</h2>
        <p>Your weekly fitness overview</p>
      </section>

      <section className="stats-grid">
        {[
          ["Steps", stats.stepsToday, "today"],
          ["Calories", stats.caloriesToday, "kcal"],
          ["Water", stats.water, "litres"],
          ["Workout", stats.workout, "minutes"],
        ].map(([title, value, unit]) => (
          <div className="stat-card" key={title}>
            <h3>{title}</h3>
            <p className="stat-value">{value}</p>
            <span className="stat-unit">{unit}</span>
          </div>
        ))}
      </section>

      <section className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Steps</h3>
          <Line
            data={{
              labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
              datasets: [{ data: weeklySteps, borderColor: "#00c6a9", tension: 0.4 }]
            }}
            options={chartOptions}
          />
        </div>

        <div className="chart-card">
          <h3>Calories Burned</h3>
          <Line
            data={{
              labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
              datasets: [{ data: weeklyCalories, borderColor: "#f97316", tension: 0.4 }]
            }}
            options={chartOptions}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
