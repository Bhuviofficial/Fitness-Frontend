import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch goals");
        }

        const data = await res.json();
        setGoals(data);
      } catch (err) {
        setError("Unable to load goals");
      } finally {
        setLoading(false); // 🔥 THIS FIXES WHITE SCREEN
      }
    };

    fetchGoals();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">🎯 Goals</h1>

      {loading && <p>Loading goals...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && goals.length === 0 && <p>No goals added yet</p>}

      <div className="card-grid">
        {goals.map((goal) => (
          <div className="card" key={goal._id}>
            <h3>{goal.name}</h3>
            <p>
              Target: {goal.target} {goal.unit}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Goals;
