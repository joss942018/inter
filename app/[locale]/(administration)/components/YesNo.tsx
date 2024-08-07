// components/ChartToggle.js
import { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartToggle = ({ data, labels, colors, totalResponses, title }) => {
    const [view, setView] = useState('pie');

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Respuestas',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">{title}</h2>
            <div className="chart-header">
                <button onClick={() => setView('pie')}>🍰</button>
                <button onClick={() => setView('bar')}>📊</button>
            </div>
            {view === 'pie' ? (
                <Pie data={chartData} />
            ) : (
                <Bar data={chartData} />
            )}
            <div className="chart-footer">
                <p>{totalResponses} respuesta(s)</p>
            </div>
            <div className="chart-legend">
                {labels.map((label, index) => (
                    <div key={index} className="chart-legend-item">
                        <span className="chart-legend-color" style={{ backgroundColor: colors[index] }}></span>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartToggle;
