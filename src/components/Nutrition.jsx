import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";

export default function Nutrition() {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Nutrition Tracking</h1>

        <input placeholder="Meal name" onChange={e => setMeal(e.target.value)} />
        <input placeholder="Calories" onChange={e => setCalories(e.target.value)} />
        <button>Add Meal</button>

        <p>{meal} - {calories} kcal</p>
      </div>
    </div>
  );
}
