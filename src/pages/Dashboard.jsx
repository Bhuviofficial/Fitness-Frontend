import Sidebar from "../components/Sidebar";
import Charts from "../components/Charts";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fitness-backend-2-r9y7.onrender.com/api/health")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  const latest = data[data.length - 1] || {};

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Fitness Dashboard</h1>

        <div className="cards">
          <div className="card">Steps <h2>{latest.steps || 0}</h2></div>
          <div className="card">Calories <h2>{latest.calories || 0}</h2></div>
          <div className="card">Water (L) <h2>{latest.water || 0}</h2></div>
          <div className="card">Workout <h2>{latest.workout || 0}</h2></div>
        </div>

        <Charts data={data} />
      </div>
    </div>
  );
}
