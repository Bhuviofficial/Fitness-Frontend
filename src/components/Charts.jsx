import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export default function Charts({ data }) {
  const labels = data.map(d =>
    new Date(d.date).toLocaleDateString()
  );

  return (
    <div className="charts">
      <Bar
        data={{
          labels,
          datasets: [{ label: "Steps", data: data.map(d => d.steps) }]
        }}
      />

      <Line
        data={{
          labels,
          datasets: [{ label: "Calories", data: data.map(d => d.calories) }]
        }}
      />
    </div>
  );
}
