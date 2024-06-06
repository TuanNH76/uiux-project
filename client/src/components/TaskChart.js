import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TaskChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Done',
        data: [10, 10, 7, 3, 20, 11, 0],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
      {
        label: 'KPI Done',
        data: [3, 4, 3, 0, 3, 2, 0],
        borderColor: '#248AC1',
        backgroundColor: '#44BEFF',
      },
      {
        label: 'Goals Done',
        data: [2, 1, 2, 1, 3, 5, 0],
        borderColor: '#0000AC',
        backgroundColor: '#0000FF',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tasks, KPI, and Goals Done Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaskChart;