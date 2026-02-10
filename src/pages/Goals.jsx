import { useState } from "react";
import Layout from "../components/Layout";

const Goals = () => {
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    alert("Goal Added (connect backend next)");
    setGoal("");
    setTarget("");
  };

  return (
    <Layout>
      <section className="page-header">
        <h2>🎯 Fitness Goals</h2>
        <p>Set and track your personal goals</p>
      </section>

      <form className="card-form" onSubmit={handleAddGoal}>
        <label>Goal Name</label>
        <input
          type="text"
          placeholder="e.g. Weight Loss"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />

        <label>Target</label>
        <input
          type="text"
          placeholder="e.g. Lose 5kg in 2 months"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />

        <button className="primary-btn">Add Goal</button>
      </form>
    </Layout>
  );
};

export default Goals;
