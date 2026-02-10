import { useState } from "react";
import Layout from "../components/Layout";

const Exercise = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");

  const handleAddExercise = (e) => {
    e.preventDefault();
    alert("Exercise Added (connect backend next)");
    setExercise("");
    setDuration("");
  };

  return (
    <Layout>
      <section className="page-header">
        <h2>🏋️ Exercise Tracker</h2>
        <p>Log your daily workouts</p>
      </section>

      <form className="card-form" onSubmit={handleAddExercise}>
        <label>Exercise Name</label>
        <input
          type="text"
          placeholder="e.g. Running"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
        />

        <label>Duration (minutes)</label>
        <input
          type="number"
          placeholder="30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <button className="primary-btn">Add Exercise</button>
      </form>
    </Layout>
  );
};

export default Exercise;
