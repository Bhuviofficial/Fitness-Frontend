import {
  Footprints,
  Flame,
  Droplets,
  Dumbbell
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="title">Welcome back 👋</h1>

      <div className="stats-grid">
        <StatCard
          icon={<Footprints />}
          label="Steps"
          value="7,500"
          unit="steps"
          color="blue"
        />
        <StatCard
          icon={<Flame />}
          label="Calories"
          value="520"
          unit="kcal"
          color="red"
        />
        <StatCard
          icon={<Droplets />}
          label="Water"
          value="2.5"
          unit="L"
          color="cyan"
        />
        <StatCard
          icon={<Dumbbell />}
          label="Workout"
          value="45"
          unit="mins"
          color="purple"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, unit, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="icon">{icon}</div>
      <div>
        <p className="label">{label}</p>
        <h2 className="value">
          {value} <span>{unit}</span>
        </h2>
      </div>
    </div>
  );
}
