import { useState } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const addExercise = () => {
    if (!name || !duration || !calories) return;

    setExercises([
      {
        id: Date.now(),
        name,
        duration,
        calories,
      },
      ...exercises,
    ]);

    setName("");
    setDuration("");
    setCalories("");
  };

  return (
    <div className="exercise-page">
      <h2>Exercise Tracking</h2>
      <p>Log your workouts</p>

      <div className="exercise-form">
        <input
          placeholder="Exercise name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button className="primary-btn" onClick={addExercise}>
          Add Exercise
        </button>
      </div>

      {exercises.map((e) => (
        <div className="exercise-card" key={e.id}>
          <h4>{e.name}</h4>
          <p>{e.duration} min • {e.calories} kcal</p>
        </div>
      ))}
    </div>
  );
};

export default Exercise;
