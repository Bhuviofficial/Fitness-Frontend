import { useState } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddExercise = () => {
    if (!name || !duration || !calories) return;

    const newExercise = {
      id: Date.now(),
      name,
      duration: Number(duration),
      calories: Number(calories),
    };

    setExercises([newExercise, ...exercises]);
    setName("");
    setDuration("");
    setCalories("");
  };

  const totalDuration = exercises.reduce((a, b) => a + b.duration, 0);
  const totalCalories = exercises.reduce((a, b) => a + b.calories, 0);

  return (
    <div className="exercise-page">
      {/* HEADER */}
      <header className="exercise-header">
        <h2>Exercise Tracking</h2>
        <p>Log and monitor your daily workouts</p>
      </header>

      {/* SUMMARY */}
      <section className="exercise-summary">
        <div className="summary-card">
          <h4>Total Duration</h4>
          <p className="summary-value">{totalDuration} min</p>
        </div>

        <div className="summary-card">
          <h4>Calories Burned</h4>
          <p className="summary-value">{totalCalories} kcal</p>
        </div>
      </section>

      {/* ADD EXERCISE */}
      <section className="exercise-form">
        <h3>Add Exercise</h3>

        <input
          type="text"
          placeholder="Exercise name (Running, Yoga...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="number"
          placeholder="Calories burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button className="primary-btn" onClick={handleAddExercise}>
          ➕ Add Exercise
        </button>
      </section>

      {/* EXERCISE LIST */}
      <section className="exercise-list">
        <h3>Today’s Workouts</h3>

        {exercises.length === 0 ? (
          <p className="empty-text">No exercises logged yet</p>
        ) : (
          exercises.map((ex) => (
            <div className="exercise-card" key={ex.id}>
              <div>
                <h4>{ex.name}</h4>
                <p>{ex.duration} min • {ex.calories} kcal</p>
              </div>

              <div className="exercise-progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((ex.duration / 60) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Exercise;
