import React from "react";

const Goals = () => {
  const goals = [
    {
      title: "Daily Steps",
      current: 6500,
      target: 10000,
      status: "active",
    },
    {
      title: "Calories Burn",
      current: 420,
      target: 600,
      status: "active",
    },
    {
      title: "Water Intake",
      current: 2.5,
      target: 3,
      status: "done",
    },
  ];

  return (
    <div className="goals-page">
      {/* HEADER */}
      <div className="goals-header">
        <div>
          <h2>Your Goals</h2>
          <p>Track your daily fitness targets</p>
        </div>
      </div>

      {/* CREATE GOAL CARD */}
      <div className="goal-form-card">
        <h3>Create New Goal</h3>
        <div className="goal-form">
          <input type="text" placeholder="Goal Name" />
          <input type="number" placeholder="Target Value" />
          <input type="text" placeholder="Unit (steps, kcal, L)" />
          <button className="primary-btn">Add Goal</button>
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
                <span
                  className={`goal-status ${
                    goal.status === "done" ? "done" : "active"
                  }`}
                >
                  {goal.status === "done" ? "Completed" : "In Progress"}
                </span>
              </div>

              <div className="goal-target">
                {goal.current} / {goal.target}
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <span className="progress-text">
                {Math.round(progress)}% achieved
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
