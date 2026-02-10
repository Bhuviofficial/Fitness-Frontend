import { useEffect, useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  // LOAD goals on page load
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
  }, []);

  // SAVE goals whenever they change
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!title || !target) return;

    const newGoal = {
      id: Date.now(),
      title,
      target,
      progress: 0
    };

    setGoals([...goals, newGoal]);
    setTitle("");
    setTarget("");
  };

  return (
    <div className="goals-page">
      <div className="page-header">
        <h2>Goals</h2>
        <p>Track your fitness goals</p>
      </div>

      <div className="goal-form">
        <input
          placeholder="Goal name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <h3>{goal.title}</h3>
            <p>Target: {goal.target}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
