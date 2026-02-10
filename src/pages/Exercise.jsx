import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/exercise`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await res.json();
        setExercises(data);
      } catch (err) {
        setError("Unable to load exercises");
      } finally {
        setLoading(false); // 🔥 FIX
      }
    };

    fetchExercises();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">🏋️ Exercise</h1>

      {loading && <p>Loading exercises...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && exercises.length === 0 && <p>No exercises logged yet</p>}

      <div className="card-grid">
        {exercises.map((ex) => (
          <div className="card" key={ex._id}>
            <h3>{ex.name}</h3>
            <p>{ex.duration} minutes</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Exercise;
