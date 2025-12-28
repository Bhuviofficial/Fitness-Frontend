import Navbar from "../components/Navbar.jsx";
import StatCard from "../components/StatCard";
function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Welcome back 👋</h1>

        <div className="stats-grid">
          <StatCard title="Steps" value="7,500" unit="steps" />
          <StatCard title="Calories" value="520" unit="kcal" />
          <StatCard title="Water" value="2.5" unit="L" />
          <StatCard title="Workout" value="45" unit="mins" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
