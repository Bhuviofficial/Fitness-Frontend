function StatCard({ title, value, unit }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>
        {value} <span>{unit}</span>
      </p>
    </div>
  );
}

export default StatCard;
