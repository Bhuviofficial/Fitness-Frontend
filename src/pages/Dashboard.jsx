import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          "https://fitness-backend-1-lgej.onrender.com/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(res.data);
      } catch (error) {
        // Token expired or invalid
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "30px", color: "#fff" }}>
          <h3>Loading dashboard...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px", color: "#fff" }}>
        <h1>🏋️ Fitness Dashboard</h1>
        <p style={{ marginTop: "10px" }}>
          Welcome back, <strong>{dashboardData?.name}</strong>
        </p>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h3>🔥 Calories Burned</h3>
            <p style={valueStyle}>{dashboardData?.calories || 0}</p>
          </div>

          <div style={cardStyle}>
            <h3>💪 Workouts</h3>
            <p style={valueStyle}>{dashboardData?.workouts || 0}</p>
          </div>

          <div style={cardStyle}>
            <h3>🚶 Steps</h3>
            <p style={valueStyle}>{dashboardData?.steps || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const cardStyle = {
  background: "rgba(255,255,255,0.1)",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default Dashboard;
