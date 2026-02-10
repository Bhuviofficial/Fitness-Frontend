import { useState } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const addExercise = () => {
    if (!name || !duration) return;

    const newExercise = {
      id: Date.now(),
      name,
      duration
    };

    setExercises([...exercises, newExercise]);

    setName("");
    setDuration("");
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>Exercise</h2>
        <p>Log your workouts</p>
      </div>

      {/* ADD EXERCISE */}
      <div className="goal-form">
        <input
          type="text"
          placeholder="Exercise name (Running, Yoga)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button className="primary-btn" onClick={addExercise}>
          Add Exercise
        </button>
      </div>

      {/* EXERCISE LIST */}
      <div className="goals-grid">
        {exercises.length === 0 && <p>No exercises logged yet</p>}

        {exercises.map((ex) => (
          <div className="goal-card" key={ex.id}>
            <h4>{ex.name}</h4>
            <div className="goal-value">{ex.duration} minutes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercise;
