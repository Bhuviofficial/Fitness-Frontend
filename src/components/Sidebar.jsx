import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Fitness</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/nutrition">Nutrition</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </aside>
  );
}
