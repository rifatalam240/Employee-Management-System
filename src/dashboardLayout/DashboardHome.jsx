import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  // Static Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Hours Worked",
        data: [120, 150, 130, 180, 200, 170],
        backgroundColor: "#4f46e5",
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Admin", "HR", "Employees"],
    datasets: [
      {
        data: [3, 5, 12],
        backgroundColor: ["#f43f5e", "#10b981", "#3b82f6"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-700">Dashboard</h2>

      {/* Summary Cards for Admin, HR, and Employee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-gray-500">Total Employees</h4>
          <p className="text-2xl font-bold text-gray-700">20</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-gray-500">Pending Payments</h4>
          <p className="text-2xl font-bold text-gray-700">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-gray-500">Verified HR</h4>
          <p className="text-2xl font-bold text-gray-700">5</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Work Hours</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">User Roles</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Employee-Specific Data */}
      <div className="bg-white p-4 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Employee Details</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Employee</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Verified</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Rifat</td>
              <td className="py-2">rifat@example.com</td>
              <td className="py-2">Employee</td>
              <td className="py-2">✅</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Nashit</td>
              <td className="py-2">nashit@example.com</td>
              <td className="py-2">HR</td>
              <td className="py-2">✅</td>
            </tr>
            <tr>
              <td className="py-2">Tanvir</td>
              <td className="py-2">tanvir@example.com</td>
              <td className="py-2">Employee</td>
              <td className="py-2">❌</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment History Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Payments</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Employee</th>
              <th className="py-2">Month</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Rifat</td>
              <td className="py-2">June</td>
              <td className="py-2">৳500</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Nashit</td>
              <td className="py-2">June</td>
              <td className="py-2">৳600</td>
            </tr>
            <tr>
              <td className="py-2">Tanvir</td>
              <td className="py-2">June</td>
              <td className="py-2">৳550</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ HR Nashit verified employee Rifat.</li>
          <li>💳 Payment of ৳500 completed to Rifat.</li>
          <li>📝 Employee Tanvir submitted worksheet for June.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;