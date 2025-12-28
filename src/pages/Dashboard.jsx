import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Welcome to Your Fitness Dashboard</h1>

        {data ? (
          <div className="cards">
            <div className="card">
              <h3>Calories</h3>
              <p>{data.calories}</p>
            </div>

            <div className="card">
              <h3>Steps</h3>
              <p>{data.steps}</p>
            </div>

            <div className="card">
              <h3>Goals</h3>
              <p>{data.goals}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
