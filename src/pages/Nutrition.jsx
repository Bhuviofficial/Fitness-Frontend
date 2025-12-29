const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <header className="nutrition-header">
        <h2>Nutrition</h2>
        <p>Track what you eat today</p>
      </header>

  
      <section className="nutrition-summary">
        <div className="summary-card">
          <h4>Total Calories</h4>
          <p className="summary-value">1,850 kcal</p>
        </div>

        <div className="summary-card">
          <h4>Protein</h4>
          <p className="summary-value">95 g</p>
        </div>

        <div className="summary-card">
          <h4>Carbs</h4>
          <p className="summary-value">210 g</p>
        </div>

        <div className="summary-card">
          <h4>Fats</h4>
          <p className="summary-value">60 g</p>
        </div>
      </section>

    
      <section className="meals-section">
        <h3>Meals</h3>

        <div className="meal-card">
          <div>
            <h4>Breakfast</h4>
            <p>Oats, banana, almonds</p>
          </div>
          <span className="meal-cal">450 kcal</span>
        </div>

        <div className="meal-card">
          <div>
            <h4>Lunch</h4>
            <p>Brown rice, chicken, veggies</p>
          </div>
          <span className="meal-cal">650 kcal</span>
        </div>

        <div className="meal-card">
          <div>
            <h4>Snack</h4>
            <p>Fruit bowl</p>
          </div>
          <span className="meal-cal">250 kcal</span>
        </div>

        <div className="meal-card">
          <div>
            <h4>Dinner</h4>
            <p>Grilled fish, salad</p>
          </div>
          <span className="meal-cal">500 kcal</span>
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
