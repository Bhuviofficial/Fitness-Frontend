import { useEffect, useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // fetch goals 
 useEffect(() => {
  const fetchGoals = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    setGoals(data);
  };

  fetchGoals();
}, []);

  // add new goal
  const addGoal = async () => {
    if (!name || !target || !unit) return alert("Fill all fields");

    const res = await fetch(`${BACKEND_URL}/api/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, target, unit }),
    });

    const newGoal = await res.json();
    setGoals([...goals, newGoal]);

    setName("");
    setTarget("");
    setUnit("");
  };

  if (loading) return <p>Loading goals...</p>;

  return (
    <div className="goals-page">
      <header className="goals-header">
        <h2>Goals 🎯</h2>
        <p>Set and track your fitness targets</p>
      </header>

      {/* ADD GOAL */}
      <div className="goal-card section">
        <h4>Add New Goal</h4>

        <input
          placeholder="Goal Name (Steps, Weight, Water)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <input
          placeholder="Unit (steps, kg, litres)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        <button className="primary-btn" onClick={addGoal}>
          ➕ Add Goal
        </button>
      </div>

      {/* GOALS LIST */}
      <div className="goals-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal._id}>
            <h4>{goal.name}</h4>
            <div className="goal-value">
              {goal.target} {goal.unit}
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "50%" }} />
            </div>

            <p className="goal-progress">Progress: 50%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
