const Goals = () => {
  return (
    <div className="goals-page">
      <header className="goals-header">
        <h2>Goals</h2>
        <p>Stay consistent. Stay fit.</p>
      </header>

      <section className="goals-grid">
        <div className="goal-card">
          <h4>Daily Steps</h4>
          <p className="goal-value">10,000</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
          <span className="goal-progress">7,500 / 10,000</span>
        </div>

        <div className="goal-card">
          <h4>Calories Burn</h4>
          <p className="goal-value">700 kcal</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <span className="goal-progress">520 / 700 kcal</span>
        </div>

        <div className="goal-card">
          <h4>Water Intake</h4>
          <p className="goal-value">3 L</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "83%" }}></div>
          </div>
          <span className="goal-progress">2.5 / 3 L</span>
        </div>

        <div className="goal-card">
          <h4>Workout Time</h4>
          <p className="goal-value">60 mins</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
          <span className="goal-progress">45 / 60 mins</span>
        </div>
      </section>
    </div>
  );
};

export default Goals;
