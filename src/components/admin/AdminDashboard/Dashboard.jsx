import React, { useEffect, useState } from "react";
import axios from "axios";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Statistic Card Component
const StatisticCard = ({ title, value }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-lg font-bold text-blue-900">{title}</h3>
    <p className="text-2xl font-bold text-yellow-500">{value}</p>
  </div>
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null); // Chart data state
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeRequests, setActiveRequests] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);

  useEffect(() => {
    // Fetch and set data from APIs
    const fetchData = async () => {
      try {
        const [usersRes, requestsRes, completedRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/all-users`),
          fetch(`${API_BASE_URL}/api/request-counts`),
          axios.get(`${API_BASE_URL}/api/records/count`),
        ]);

        const usersData = await usersRes.json();
        const requestsData = await requestsRes.json();

        setTotalUsers(usersData.totalUsers);
        setActiveRequests(requestsData.pending);
        setTotalProcessed(requestsData.cleared);
        setTotalRejected(requestsData.rejected);
        setCompletedRequests(completedRes.data.count);

        // Update chart data dynamically
        setChartData({
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Requests Processed",
              data: [
                requestsData.cleared,
                requestsData.cleared + 10,
                requestsData.cleared - 5,
                requestsData.cleared + 20,
              ],
              backgroundColor: "rgba(234, 179, 8, 1)",
            },
            {
              label: "Pending Requests",
              data: [
                requestsData.pending,
                requestsData.pending + 5,
                requestsData.pending - 2,
                requestsData.pending + 8,
              ],
              backgroundColor: "rgba(30, 58, 138, 1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  if (!chartData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <StatisticCard title="Total Users" value={totalUsers} />
        <StatisticCard title="Active Requests" value={activeRequests} />
        <StatisticCard title="Requests Processed" value={totalProcessed} />
        <StatisticCard title="Requests Rejected" value={totalRejected} />
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatisticCard title="Documents Received" value={completedRequests} />
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-[25px] font-bold text-blue-900 mb-2 justify-center flex">
            Summary Metrics
          </h3>
          <ul className="space-y-2 text-yellow-500 font-medium">
            <li>
              <strong className="text-blue-900">Average Waiting Time:</strong>{" "}
              5 minutes
            </li>
            <li>
              <strong className="text-blue-900">Requests Per Day:</strong> 100
            </li>
          </ul>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Queue Requests Overview
        </h2>
        <Bar
          data={chartData}
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
