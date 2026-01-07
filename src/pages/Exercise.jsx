import { useEffect, useState } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 // fetch exercises 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/exercises`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error("Failed to load exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);
  
// add new exercise
  const addExercise = async () => {
    if (!name || !duration || !calories)
      return alert("Fill all fields");

    const res = await fetch(`${BACKEND_URL}/api/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        duration,
        calories,
      }),
    });

    const newExercise = await res.json();
    setExercises([...exercises, newExercise]);

    setName("");
    setDuration("");
    setCalories("");
  };

  if (loading) return <p>Loading exercises...</p>;

  return (
    <div className="nutrition-page">
      <header className="nutrition-header">
        <h2>Exercises 💪</h2>
        <p>Track your workouts</p>
      </header>

      {/* ADD EXERCISE */}
      <div className="meal-card section">
        <div>
          <input
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

          <input
            type="number"
            placeholder="Calories burned"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button className="primary-btn" onClick={addExercise}>
            ➕ Add Exercise
          </button>
        </div>
      </div>

      {/* EXERCISE LIST */}
      {exercises.map((ex) => (
        <div className="meal-card" key={ex._id}>
          <div>
            <h4>{ex.name}</h4>
            <p>{ex.duration} minutes</p>
          </div>
          <span className="meal-cal">{ex.calories} kcal</span>
        </div>
      ))}
    </div>
  );
};

export default Exercise;
