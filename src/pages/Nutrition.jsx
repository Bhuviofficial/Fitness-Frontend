import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nutrition = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({
    meal: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const API = import.meta.env.VITE_BACKEND_URL;

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* ================= FETCH TODAY MEALS ================= */
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${API}/api/nutrition/today`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to load meals");
      }
    };

    fetchMeals();
  }, [API, token]);

  /* ================= CALCULATIONS ================= */
  const totals = meals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fats += meal.fats;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  /* ================= ADD MEAL ================= */
  const addMeal = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/nutrition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          calories: Number(form.calories),
          protein: Number(form.protein),
          carbs: Number(form.carbs),
          fats: Number(form.fats),
        }),
      });

      const newMeal = await res.json();
      setMeals([newMeal, ...meals]);

      setForm({
        meal: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      });
    } catch (err) {
      console.error("Error adding meal");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="nutrition-page">
      <header className="nutrition-header">
        <h2>Nutrition</h2>
        <p>Track what you eat today</p>
      </header>

      {/* SUMMARY */}
      <section className="nutrition-summary">
        <div className="summary-card">
          <h4>Total Calories</h4>
          <p className="summary-value">{totals.calories} kcal</p>
        </div>

        <div className="summary-card">
          <h4>Protein</h4>
          <p className="summary-value">{totals.protein} g</p>
        </div>

        <div className="summary-card">
          <h4>Carbs</h4>
          <p className="summary-value">{totals.carbs} g</p>
        </div>

        <div className="summary-card">
          <h4>Fats</h4>
          <p className="summary-value">{totals.fats} g</p>
        </div>
      </section>

      {/* ADD MEAL */}
      <section className="add-meal">
        <h3>Add Meal</h3>

        <form className="meal-form" onSubmit={addMeal}>
          <input
            type="text"
            placeholder="Meal name (Breakfast, Lunch...)"
            value={form.meal}
            onChange={(e) => setForm({ ...form, meal: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Calories"
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Carbs (g)"
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Fats (g)"
            value={form.fats}
            onChange={(e) => setForm({ ...form, fats: e.target.value })}
            required
          />

          <button type="submit">Add Meal</button>
        </form>
      </section>

      {/* MEALS LIST */}
      <section className="meals-section">
        <h3>Meals</h3>

        {meals.length === 0 && <p>No meals added today</p>}

        {meals.map((meal) => (
          <div key={meal._id} className="meal-card">
            <div>
              <h4>{meal.meal}</h4>
              <p>
                Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats:{" "}
                {meal.fats}g
              </p>
            </div>
            <span className="meal-cal">{meal.calories} kcal</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Nutrition;
