import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dashboardData from "../../../data/chart";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Directly set the imported data as there is no fetching
    setData(dashboardData);
  }, []);

  if (!data) return <div>Loading...</div>; // Loading state

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600">Total Users: {data.overview.totalUsers}</p>
          <p className="text-gray-600">Active Requests: {data.overview.activeRequests}</p>
          <p className="text-gray-600">Total Processed: {data.overview.totalProcessed}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <ul className="list-disc pl-5">
            {data.statistics.map((stat, index) => (
              <li key={index}>
                {stat.label}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <ul className="list-disc pl-5">
            {data.recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Queue Requests Overview</h2>
        <Bar
          data={data.chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Queuing System Statistics (Last 4 Weeks)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
