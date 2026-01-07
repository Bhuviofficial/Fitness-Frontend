import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Exercise = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    exerciseName: "",
    duration: "",
    date: "",
  });
 const API_URL = import.meta.env.VITE_BACKEND_URL;

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* ================= FETCH today EXERCISES ================= */
  useEffect(() => {
   const fetchExercises = async () => {
      try {
        const res = await fetch(`${API_URL}/api/exercise/today`, { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error("Failed to load exercises");
      }
    };

    fetchExercises();
  }, [API_URL, token]);


  /* ================= calculations ================= */
  const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
  const averageDuration = exercises.length > 0 ? (totalDuration / exercises.length).toFixed(2) : 0;
  const maxDuration = exercises.length > 0 ? Math.max(...exercises.map(ex => ex.duration)) : 0;
  /* ================= ADD EXERCISE ================= */
  const addExercise = async (e) => {
    e.preventDefault(); 
    try {
      const res = await fetch(`${API_URL}/api/exercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const
  data = await res.json();
        setExercises([...exercises, data]);
        setForm({ exerciseName: "", duration: "", date: "" });
      }
    } catch (err) {
      console.error("Failed to add exercise");
    }
  };

  /*=======uI======*/
 

  return (
    <>
      <h2>Exercise Tracker</h2>
      <form onSubmit={addExercise}>
        <input
          type="text"
          name="exerciseName"
          placeholder="Exercise Name"
          value={form.exerciseName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
        />
        <button type="submit">Add Exercise</button>
      </form>
      {exercises.map(ex => (
        <p key={ex._id}>
          {ex.exerciseName} - {ex.duration} mins
        </p>
      ))}
    </>
  );
};

export default Exercise;
