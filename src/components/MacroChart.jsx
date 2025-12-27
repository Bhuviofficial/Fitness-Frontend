import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MacroChart() {
  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
      },
    ],
  };

  return <Doughnut data={data} />;
}
