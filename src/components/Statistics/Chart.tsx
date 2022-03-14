import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Paid Raveneu",
    },
  },
};

export function Chart({ bills }: any) {
  const labels = bills.map((item: any) => {
    return item.date;
  });
  const datas = bills.map((item: any) => {
    return item.totalIncome.toFixed(2);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Total Income",
        data: datas,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
