import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";

const Progress = () => {
  const axiosSecure = useAxiossecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["works", selectedEmployee, selectedMonth],
    queryFn: async () => {
      let query = "";
      if (selectedEmployee) query += `email=${selectedEmployee}&`;
      if (selectedMonth) query += `month=${selectedMonth}`;
      const res = await axiosSecure.get(`/works?${query}`);
      return res.data;
    },
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📊 Work Progress</h2>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        >
          <option value="">👥 All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.email}>
              {emp.name}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        >
          <option value="">📅 All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm md:text-base">
              <th className="border px-4 py-2">👨‍💼 Employee</th>
              <th className="border px-4 py-2">📅 Date</th>
              <th className="border px-4 py-2">📝 Description</th>
            </tr>
          </thead>
          <tbody>
            {works.length > 0 ? (
              works.map((work) => (
                <tr key={work._id} className="hover:bg-gray-50 text-sm md:text-base">
                  <td className="border px-4 py-2">{work.name || work.email}</td>
                  <td className="border px-4 py-2">{new Date(work.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{work.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No work data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
