import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://your-backend.onrender.com/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to your Dashboard
        </h2>

        {data ? (
          <pre className="bg-white p-4 rounded shadow">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
