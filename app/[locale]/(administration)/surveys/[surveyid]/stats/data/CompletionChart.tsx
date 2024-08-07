import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const CompletionChart = ({ data }) => {
  // Transformar los datos
  const labels = data.map(item => item.label);
  const chartDataValues = data.map(item => item.count !== null ? item.count : 0); // Manejar valores nulos

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Finalización',
        data: chartDataValues,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)'
      }
    ]
  };

  return <Line data={chartData} />;
};

export default CompletionChart;
