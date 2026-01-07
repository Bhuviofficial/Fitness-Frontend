import { useEffect, useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [progress, setProgress] = useState("");

  /* ---------------- FETCH GOALS ---------------- */
  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setGoals(data);
    };

    fetchGoals();
  }, []);

  /* ---------------- CREATE GOAL ---------------- */
  const createGoal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          target,
          progress,
        }),
      }
    );

    const newGoal = await res.json();
    setGoals([newGoal, ...goals]);

    setTitle("");
    setTarget("");
    setProgress("");
  };

  return (
    <div className="goals-page">
      {/* HEADER */}
      <header className="goals-header">
        <div>
          <h2>🎯 Your Fitness Goals</h2>
          <p>Track progress & stay motivated</p>
        </div>
      </header>

      {/* CREATE GOAL */}
      <section className="goal-form-card">
        <h3>Create New Goal</h3>

        <form onSubmit={createGoal} className="goal-form">
          <input
            type="text"
            placeholder="Goal title (eg. Lose weight)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Target (eg. 5 kg / 10,000 steps)"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Progress %"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            required
          />

          <button className="primary-btn">Add Goal</button>
        </form>
      </section>

      {/* GOALS LIST */}
      <section className="goals-grid">
        {goals.length === 0 && (
          <p className="empty-text">No goals yet. Start now 🚀</p>
        )}

        {goals.map((goal) => (
          <div key={goal._id} className="goal-card">
            <div className="goal-card-header">
              <h4>{goal.title}</h4>
              <span
                className={`goal-status ${
                  goal.progress >= 100 ? "done" : "active"
                }`}
              >
                {goal.progress >= 100 ? "Completed" : "In Progress"}
              </span>
            </div>

            <p className="goal-target">🎯 Target: {goal.target}</p>

            {/* PROGRESS BAR */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>

            <span className="progress-text">{goal.progress}% completed</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Goals;
