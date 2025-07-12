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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  if (empLoading || payLoading) return <p>Loading...</p>;

  if (!employee) return <p>No employee data found.</p>;

  const chartData = {
    labels: payments.map((p) => `${p.month} ${p.year}`),
    datasets: [
      {
        label: "Salary (৳)",
        data: payments.map((p) => p.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Salary History" },
    },
    scales: {
      x: { title: { display: true, text: "Month-Year" } },
      y: { title: { display: true, text: "Salary (৳)" }, beginAtZero: true },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      <img
        src={employee.image || "/default-profile.png"}
        alt={employee.name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <p>
        <strong>Designation:</strong> {employee.designation}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <div className="mt-6">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
