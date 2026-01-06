import { useEffect, useState } from "react";
import API from "../services/api";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    API.get("/exercises").then(res => setExercises(res.data));
  }, []);

  return (
    <>
      <h2>Exercise Tracker</h2>
      {exercises.map(ex => (
        <p key={ex._id}>
          {ex.exerciseName} - {ex.duration} mins
        </p>
      ))}
    </>
  );
};

export default Exercise;
