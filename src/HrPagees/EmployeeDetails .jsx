// import React from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiossecure from "../coustomHook/useAxiossecure";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const EmployeeDetails = () => {
//   const { email } = useParams();
//   const axiosSecure = useAxiossecure();

//   const { data: employee, isLoading: empLoading } = useQuery({
//     queryKey: ["employee", email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${email}`);
//       return res.data;
//     },
//     enabled: !!email,
//   });

//   const { data: payments = [], isLoading: payLoading } = useQuery({
//     queryKey: ["payments", email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments?email=${email}`);
//       return res.data.payments;
//     },
//     enabled: !!employee,
//   });

//   if (empLoading || payLoading)
//     return (
//       <p className="text-center mt-10 text-gray-700 font-semibold">
//         Loading...
//       </p>
//     );

//   if (!employee)
//     return (
//       <p className="text-center mt-10 text-red-600 font-semibold">
//         No employee data found.
//       </p>
//     );

//   const chartData = {
//     labels: payments.map((p) => `${p.month} ${p.year}`),
//     datasets: [
//       {
//         label: "Salary (৳)",
//         data: payments.map((p) => p.amount),
//         backgroundColor: "rgba(14, 93, 106, 0.7)", // nice teal
//         borderRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Salary History",
//         font: { size: 20, weight: "bold" },
//         color: "#0E5D6A",
//       },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Month - Year",
//           font: { size: 14, weight: "600" },
//           color: "#0E5D6A",
//         },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Salary (৳)",
//           font: { size: 14, weight: "600" },
//           color: "#0E5D6A",
//         },
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1000,
//           callback: (value) => `৳${value.toLocaleString()}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//         <img
//           src={employee.image || "/default-profile.png"}
//           alt={employee.name}
//           className="w-32 h-32 rounded-full object-cover border-4 border-[#0E5D6A]"
//         />
//         <div className="flex-1">
//           <h2 className="text-3xl font-extrabold text-[#0E5D6A] mb-2">
//             {employee.name}
//           </h2>
//           <p className="text-gray-700 text-lg mb-1">
//             <span className="font-semibold">Designation: </span>
//             {employee.designation || "N/A"}
//           </p>
//           <p className="text-gray-700 text-lg">
//             <span className="font-semibold">Email: </span>
//             {employee.email}
//           </p>
//         </div>
//       </div>

//       <div className="mt-10">
//         {payments.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg font-medium">
//             No salary payment history found.
//           </p>
//         ) : (
//           <Bar data={chartData} options={options} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
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

const barColors = [
  "#0E5D6A", "#14919B", "#F59E42", "#F76E6E", "#7C3AED", "#10B981",
  "#FBBF24", "#6366F1", "#EC4899", "#F43F5E", "#22D3EE", "#A3E635"
];

const EmployeeDetails = () => {
  const { email } = useParams();
  const axiosSecure = useAxiossecure();

  const { data: employee, isLoading: empLoading } = useQuery({
    queryKey: ["employee", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const { data: payments = [], isLoading: payLoading } = useQuery({
    queryKey: ["payments", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${email}`);
      return res.data.payments;
    },
    enabled: !!employee,
  });

  if (empLoading || payLoading)
    return (
      <p className="text-center mt-10 text-[#0E5D6A] font-semibold">
        Loading...
      </p>
    );

  if (!employee)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        No employee data found.
      </p>
    );

  // Prepare chart data with multiple bar colors
  const chartData = {
    labels: payments.map((p) => `${p.month} ${p.year}`),
    datasets: [
      {
        label: "Salary (৳)",
        data: payments.map((p) => p.amount),
        backgroundColor: payments.map((_, i) => barColors[i % barColors.length]),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Salary History",
        font: { size: 20, weight: "bold" },
        color: "#0E5D6A",
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month - Year",
          font: { size: 14, weight: "600" },
          color: "#0E5D6A",
        },
        ticks: {
          color: "#0E5D6A",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { color: "#e5e7eb" },
      },
      y: {
        title: {
          display: true,
          text: "Salary (৳)",
          font: { size: 14, weight: "600" },
          color: "#0E5D6A",
        },
        beginAtZero: true,
        ticks: {
          color: "#0E5D6A",
          stepSize: 1000,
          callback: (value) => `৳${value.toLocaleString()}`,
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md mt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={employee.image || "/default-profile.png"}
          alt={employee.name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#0E5D6A] shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-[#0E5D6A] mb-2">
            {employee.name}
          </h2>
          <p className="text-gray-700 text-lg mb-1">
            <span className="font-semibold">Designation: </span>
            {employee.designation || "N/A"}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Email: </span>
            {employee.email}
          </p>
        </div>
      </div>

      <div className="mt-10">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            No salary payment history found.
          </p>
        ) : (
          <div className="bg-[#f9fbfc] rounded-lg p-4 md:p-8 shadow-inner">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;