import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UseAuth from "../context/UseAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardHome = () => {
  const { user } = UseAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployees: 0,
    totalHR: 0,
    verifiedHR: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [taskTypes, setTaskTypes] = useState({});
  const [latestUsers, setLatestUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user) {
      setLoading(true); // Start loading
      Promise.all([
        axios
          .get("https://assignment-12-server-pearl-one.vercel.app/api/dashboardhome")
          .then((res) => setStats(res.data))
          .catch((err) => console.error("Stats error:", err)),
        axios
          .get("https://assignment-12-server-pearl-one.vercel.app/api/dashboard/monthly-hours")
          .then((res) => setMonthlyData(res.data))
          .catch((err) => console.error("Monthly hours error:", err)),
        axios
          .get("https://assignment-12-server-pearl-one.vercel.app/api/dashboard/task-types")
          .then((res) => setTaskTypes(res.data))
          .catch((err) => console.error("Task types error:", err)),
        axios
          .get("https://assignment-12-server-pearl-one.vercel.app/api/dashboard/latest-fired-users")
          .then((res) => setLatestUsers(res.data))
          .catch((err) => console.error("Latest users error:", err)),
      ]).finally(() => setLoading(false)); // Stop loading when all done
    }
  }, [user]);

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  // Line Chart Data
  const lineChartData = {
    labels: monthlyData.map((m) =>
      `${m._id.year}-${String(m._id.month).padStart(2, "0")}`
    ),
    datasets: [
      {
        label: "Work Hours",
        data: monthlyData.map((m) => m.totalHours),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: Object.keys(taskTypes),
    datasets: [
      {
        data: Object.values(taskTypes),
        backgroundColor: ["#3b82f6", "#facc15", "#22c55e", "#a855f7"],
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-base-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Employees</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</p>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Users</h2>
          <p className="text-2xl font-bold text-green-600">{stats.totalUsers}</p>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Total HR</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.totalHR}</p>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Verified HR</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.verifiedHR}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Monthly Work Hours</h2>
          <Line data={lineChartData} />
        </div>

        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Task Type Overview</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Calendar + Latest Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Calendar</h2>
          <Calendar
            value={date}
            onChange={setDate}
            className="bg-base-100 dark:bg-gray-900 text-gray-900 dark:text-gray-500 p-2 rounded"
          />
        </div>

        <div className="p-4 rounded-xl shadow-md bg-base-200 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Latest Fired Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestUsers.slice(0, 5).map((u, i) => (
                <tr key={i} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2 text-red-500 font-bold flex items-center">
                    <span className="mr-1">🔥</span> Fired
                  </td>
                </tr>
              ))}
              {latestUsers.length === 0 && (
                <tr>
                  <td colSpan="2" className="p-2 text-gray-500 text-center dark:text-gray-400">
                    No fired users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
