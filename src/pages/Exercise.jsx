import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Exercise = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* FETCH EXERCISES */
  const fetchExercises = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/exercises`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch exercises");

      const data = await res.json();
      setExercises(data);
    } catch (err) {
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  /* ADD EXERCISE */
  const addExercise = async (e) => {
    e.preventDefault();

    if (!name || !duration || !calories) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/exercises`,
        {
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
        }
      );

      if (!res.ok) throw new Error("Failed to add exercise");

      const data = await res.json();

      // Update UI immediately
      setExercises((prev) => [data.exercise, ...prev]);

      setName("");
      setDuration("");
      setCalories("");
    } catch (err) {
      alert("Exercise creation failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchExercises();
    }
  }, []);

  if (loading) return <div className="auth-page">Loading exercises...</div>;

  if (error)
    return (
      <div className="auth-page">
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">FitLife</h2>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={`menu-item ${isActive("/nutrition") ? "active" : ""}`}
            onClick={() => navigate("/nutrition")}
          >
            🥗 Nutrition
          </button>

          <button
            className={`menu-item ${isActive("/goals") ? "active" : ""}`}
            onClick={() => navigate("/goals")}
          >
            🎯 Goals
          </button>

          <button
            className={`menu-item ${isActive("/exercise") ? "active" : ""}`}
            onClick={() => navigate("/exercise")}
          >
            🏋️ Exercise
          </button>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h2>🏋️ Exercise Tracker</h2>

        {/* ADD EXERCISE FORM */}
        <form className="form-card" onSubmit={addExercise}>
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

          <input
            type="number"
            placeholder="Calories burned"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button className="primary-btn">Add Exercise</button>
        </form>

        {/* EXERCISE LIST */}
        <div className="list-grid">
          {exercises.length === 0 ? (
            <p>No exercises added yet</p>
          ) : (
            exercises.map((ex) => (
              <div className="list-card" key={ex._id}>
                <h4>{ex.name}</h4>
                <p>⏱ {ex.duration} minutes</p>
                <p>🔥 {ex.calories} kcal</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Exercise;
