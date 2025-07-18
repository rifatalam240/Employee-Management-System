import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";

const PRIMARY_COLOR = "#0E5D6A";

const Progress = () => {
  const axiosSecure = useAxiossecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); // এখন number হবে
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [2023, 2024, 2025, 2026];

  // Fetch employees list for dropdown
  const { data: employees = [], isLoading: empLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  // Fetch work entries with filters
  const { data: works = [], isLoading: worksLoading } = useQuery({
    queryKey: ["works", selectedEmployee, selectedMonth, selectedYear],
    queryFn: async () => {
      let query = "";
      if (selectedEmployee) query += `email=${encodeURIComponent(selectedEmployee)}&`;
      if (selectedMonth && selectedYear) query += `month=${selectedMonth}&year=${selectedYear}`;
      const res = await axiosSecure.get(`/works?${query}`);
      return res.data;
    },
  });

  // Calculate total hours
  const totalHours = useMemo(() => {
    return works.reduce((sum, w) => sum + (Number(w.hours) || 0), 0);
  }, [works]);

  if (empLoading || worksLoading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#0E5D6A]">
        📊 Work Progress
      </h2>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        {/* Employee filter */}
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64 focus:outline-[#0E5D6A]"
        >
          <option value="">👥 All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.email}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Month filter */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64 focus:outline-[#0E5D6A]"
        >
          <option value="">📅 All Months</option>
          {months.map((m, idx) => (
            <option key={m} value={idx + 1}> {/* মাসের নম্বর পাঠানো হচ্ছে */}
              {m}
            </option>
          ))}
        </select>

        {/* Year filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64 focus:outline-[#0E5D6A]"
        >
          <option value="">📆 Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Total Hours */}
      <div className="mb-4 flex justify-center">
        <div className="bg-[#e0f2fe] text-[#0E5D6A] px-6 py-3 rounded-lg shadow font-semibold text-lg flex items-center gap-2">
          <span>🕒</span>
          Total Work Hours: <span className="ml-2 text-2xl">{totalHours}</span>
        </div>
      </div>

      {/* Work Entries Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-[#0E5D6A] text-white text-sm md:text-base">
              <th className="border px-4 py-2">👨‍💼 Employee</th>
              <th className="border px-4 py-2">📅 Date</th>
              <th className="border px-4 py-2">📝 Description</th>
              <th className="border px-4 py-2">⏱️ Hours</th>
            </tr>
          </thead>
          <tbody>
            {works.length > 0 ? (
              works.map((work) => (
                <tr key={work._id} className="hover:bg-blue-50 text-sm md:text-base">
                  <td className="border px-4 py-2">{work.name || work.email}</td>
                  <td className="border px-4 py-2">
                    {new Date(work.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{work.description || "N/A"}</td>
                  <td className="border px-4 py-2 text-center font-semibold">{work.hours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
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
