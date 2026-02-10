import { useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  const addGoal = () => {
    if (!name || !target || !unit) return;

    const newGoal = {
      id: Date.now(),
      name,
      target,
      unit,
      progress: 0
    };

    setGoals([...goals, newGoal]);

    // clear inputs
    setName("");
    setTarget("");
    setUnit("");
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>Goals</h2>
        <p>Track and achieve your fitness goals</p>
      </div>

      {/* ADD GOAL FORM */}
      <div className="goal-form">
        <input
          type="text"
          placeholder="Goal name (e.g. Steps)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target (e.g. 10000)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <input
          type="text"
          placeholder="Unit (steps, kcal, km)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        <button className="primary-btn" onClick={addGoal}>
          Add Goal
        </button>
      </div>

      {/* GOALS LIST */}
      <div className="goals-grid">
        {goals.length === 0 && <p>No goals added yet</p>}

        {goals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <h4>{goal.name}</h4>
            <div className="goal-value">
              {goal.progress} / {goal.target} {goal.unit}
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(goal.progress / goal.target) * 100}%`
                }}
              />
            </div>

            <p className="goal-progress">
              Progress: {goal.progress} {goal.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
