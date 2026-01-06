import { useEffect, useState } from "react";
import API from "../services/api";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [foodData, setFoodData] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  const fetchFoods = async () => {
    const res = await API.get("/foods");
    setFoods(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/foods", foodData);
    fetchFoods();
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <>
      <h2>Daily Food Intake</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Food Name" onChange={(e)=>setFoodData({...foodData, foodName:e.target.value})}/>
        <input placeholder="Calories" type="number" onChange={(e)=>setFoodData({...foodData, calories:e.target.value})}/>
        <button>Add</button>
      </form>

      {foods.map(f => (
        <p key={f._id}>{f.foodName} - {f.calories} kcal</p>
      ))}
    </>
  );
};

export default Food;
