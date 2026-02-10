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
      { id: Date.now(), name, duration }
    ]);

    setName("");
    setDuration("");
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <h2>Exercise</h2>
        <p>Log your workouts</p>
      </div>

      <div className="exercise-form">
        <input
          placeholder="Exercise name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={addExercise}>Add Exercise</button>
      </div>

      {exercises.map((ex) => (
        <div className="exercise-card" key={ex.id}>
          <strong>{ex.name}</strong>
          <span>{ex.duration} mins</span>
        </div>
      ))}
    </div>
  );
};

export default Exercise;
