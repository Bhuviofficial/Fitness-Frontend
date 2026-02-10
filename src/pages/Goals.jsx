import { useEffect, useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  // LOAD goals on page open
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
  }, []);

  // SAVE goals whenever updated
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!name || !target || !unit) return;

    const newGoal = {
      id: Date.now(),
      name,
      target,
      unit,
      progress: 0,
    };

    setGoals([...goals, newGoal]);

    setName("");
    setTarget("");
    setUnit("");
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>Goals</h2>
        <p>Track and achieve your goals</p>
      </div>

      <div className="goal-form">
        <input placeholder="Goal name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)} />
        <input placeholder="Unit (steps, kcal)" value={unit} onChange={(e) => setUnit(e.target.value)} />
        <button className="primary-btn" onClick={addGoal}>Add Goal</button>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <h4>{goal.name}</h4>
            <div className="goal-value">
              {goal.progress} / {goal.target} {goal.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
