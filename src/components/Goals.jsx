import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Goals() {
  const [goal, setGoal] = useState("");

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Goals</h1>

        <input
          placeholder="Enter your fitness goal"
          onChange={e => setGoal(e.target.value)}
        />
        <button>Save Goal</button>

        <p>Current Goal: {goal}</p>
      </div>
    </div>
  );
}
