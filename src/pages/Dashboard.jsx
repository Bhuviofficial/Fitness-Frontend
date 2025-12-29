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

const Dashboard = ({ data }) => {
  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: data?.steps || [],
        borderColor: "#00c6a9",
        backgroundColor: "rgba(0,198,169,0.2)",
        tension: 0.4,
      },
    ],
  };

  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned",
        data: data?.calories || [],
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <section className="welcome-card">
        <h2>Welcome back 👋</h2>
        <p>Your weekly fitness overview</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Steps Today</h3>
          <p className="stat-value">{data?.stats?.stepsToday}</p>
        </div>

        <div className="stat-card">
          <h3>Calories</h3>
          <p className="stat-value">{data?.stats?.caloriesToday}</p>
        </div>

        <div className="stat-card">
          <h3>Water</h3>
          <p className="stat-value">{data?.stats?.water}</p>
        </div>

        <div className="stat-card">
          <h3>Workout</h3>
          <p className="stat-value">{data?.stats?.workout}</p>
        </div>
      </section>

      <section className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Steps</h3>
          <Line data={stepsData} />
        </div>

        <div className="chart-card">
          <h3>Calories Burned</h3>
          <Line data={caloriesData} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
