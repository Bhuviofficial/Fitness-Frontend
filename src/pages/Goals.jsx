import React, { useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      title: "Daily Steps",
      current: 6500,
      target: 10000,
      unit: "steps",
      status: "active",
    },
    {
      title: "Calories Burn",
      current: 420,
      target: 600,
      unit: "kcal",
      status: "active",
    },
  ]);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  // ✅ ADD GOAL FUNCTION
  const handleAddGoal = () => {
    if (!title || !target || !unit) return;

    const newGoal = {
      title,
      current: 0,
      target: Number(target),
      unit,
      status: "active",
    };

    setGoals([...goals, newGoal]);

    // reset form
    setTitle("");
    setTarget("");
    setUnit("");
  };

  return (
    <div className="goals-page">
      {/* HEADER */}
      <div className="goals-header">
        <h2>Your Goals</h2>
        <p>Track your daily fitness targets</p>
      </div>

      {/* CREATE GOAL */}
      <div className="goal-form-card">
        <h3>Create New Goal</h3>

        <div className="goal-form">
          <input
            type="text"
            placeholder="Goal Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Target Value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <input
            type="text"
            placeholder="Unit (steps, kcal, L)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <button className="primary-btn" onClick={handleAddGoal}>
            ➕ Add Goal
          </button>
        </div>
      </div>

      {/* GOALS GRID */}
      <div className="goals-grid">
        {goals.map((goal, index) => {
          const progress = Math.min(
            (goal.current / goal.target) * 100,
            100
          );

          return (
            <div className="goal-card" key={index}>
              <div className="goal-card-header">
                <h4>{goal.title}</h4>
                <span className="goal-unit">{goal.unit}</span>
              </div>

              <div className="goal-value">
                {goal.current} / {goal.target} {goal.unit}
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="goal-progress">
                {Math.round(progress)}% completed
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
