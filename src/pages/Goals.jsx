import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Goals = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [goals, setGoals] = useState([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* FETCH USER GOALS */
  const fetchGoals = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch goals");

      const data = await res.json();
      setGoals(data);
    } catch (err) {
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  /* ADD GOAL */
  const addGoal = async (e) => {
    e.preventDefault();

    if (!name || !target || !unit) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, target, unit }),
        }
      );

      if (!res.ok) throw new Error("Failed to add goal");

      const data = await res.json();

      // Add new goal to UI instantly
      setGoals((prev) => [data.goal, ...prev]);

      // Reset inputs
      setName("");
      setTarget("");
      setUnit("");
    } catch (err) {
      alert("Goal creation failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchGoals();
    }
  }, []);

  if (loading) return <div className="auth-page">Loading goals...</div>;

  if (error)
    return (
      <div className="auth-page">
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );

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

          <button
            className={`menu-item ${isActive("/exercise") ? "active" : ""}`}
            onClick={() => navigate("/exercise")}
          >
            🏋️ Exercise
          </button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h2>🎯 My Goals</h2>

        {/* ADD GOAL FORM */}
        <form className="form-card" onSubmit={addGoal}>
          <input
            type="text"
            placeholder="Goal name (e.g. Lose Weight)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Target value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <input
            type="text"
            placeholder="Unit (kg, steps, days)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <button className="primary-btn">Add Goal</button>
        </form>

        {/* GOALS LIST */}
        <div className="list-grid">
          {goals.length === 0 ? (
            <p>No goals added yet</p>
          ) : (
            goals.map((goal) => (
              <div className="list-card" key={goal._id}>
                <h4>{goal.name}</h4>
                <p>
                  Target: <b>{goal.target}</b> {goal.unit}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Goals;
