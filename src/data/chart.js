// dashboardData.js
const dashboardData = {
    overview: {
      totalUsers: 150,
      activeRequests: 25,
      totalProcessed: 300
    },
    statistics: [

      {
        label: "Completed Requests",
        value: 300
      },
      {
        label: "Average Waiting Time",
        value: "5 mins"
      },
      {
        label: "Requests per Day",
        value: 100
      }
    ],
    recentActivities: [
      "User John Doe has submitted a request.",
      "Admin Jane Smith has processed a report.",
      "User Alice has logged in."
    ],
    chartData: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Requests Processed",
          data: [20, 40, 35, 50],
          backgroundColor: "rgba(75, 192, 192, 0.6)"
        },
        {
          label: "Pending Requests",
          data: [5, 10, 8, 15],
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }
      ]
    }
  };
  
  export default dashboardData;
  