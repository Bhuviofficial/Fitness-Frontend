import { useEffect, useState } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exercises")) || [];
    setExercises(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = () => {
    if (!name || !duration) return;

    setExercises([
      ...exercises,
      { id: Date.now(), name, duration },
    ]);

    setName("");
    setDuration("");
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>Exercise</h2>
        <p>Log your workouts</p>
      </div>

      <div className="goal-form">
        <input placeholder="Exercise name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Minutes" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <button className="primary-btn" onClick={addExercise}>Add Exercise</button>
      </div>

      <div className="goals-grid">
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
