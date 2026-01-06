import { useEffect, useState } from "react";
import API from "../services/api";

const Goals = () => {
  const [goal, setGoal] = useState({});

  useEffect(() => {
    API.get("/goals").then(res => setGoal(res.data));
  }, []);

  const saveGoal = async () => {
    await API.post("/goals", goal);
    alert("Goal Saved");
  };

  return (
    <>
      <h2>My Goals</h2>
      <input placeholder="Daily Calories"
        onChange={(e)=>setGoal({...goal, dailyCalories:e.target.value})}/>
      <button onClick={saveGoal}>Save</button>
    </>
  );
};

export default Goals;
