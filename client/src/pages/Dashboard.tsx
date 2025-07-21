import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://roadsense-backend-enlj.onrender.com/api/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchData();
  }, []);

  // === Bar chart: road condition frequency ===
  const conditionCounts = data.reduce((acc: any, row) => {
    const condition = row.road_condition || "Unknown";
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(conditionCounts),
    datasets: [
      {
        label: "Road Conditions",
        data: Object.values(conditionCounts),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // === Line chart: average speed over time ===
  const speedData = data
    .filter((row) => row.timestamp && row.speed)
    .map((row) => ({
      x: new Date(row.timestamp),
      y: parseFloat(row.speed),
    }))
    .sort((a, b) => a.x.getTime() - b.x.getTime()); // sort by time

  const lineData = {
    datasets: [
      {
        label: "Speed Over Time",
        data: speedData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "minute" as const,
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Speed (km/h)",
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h2>📊 Road Condition Summary</h2>
      <Bar data={barData} />

      <h2 style={{ marginTop: "3rem" }}>📈 Speed Over Time</h2>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default Dashboard;
