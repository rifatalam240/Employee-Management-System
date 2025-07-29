import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", salary: 1000 },
  { name: "Feb", salary: 1200 },
  { name: "Mar", salary: 1500 },
  { name: "Apr", salary: 1800 },
];

const EmployeeDashboard = () => {
  return (
    <div className="p-4 md:p-6">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Payment History
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Total Salary", value: "$5500", gradient: "from-indigo-500 to-purple-500" },
          { title: "Paid Months", value: "3", gradient: "from-green-400 to-emerald-600" },
          { title: "Remaining", value: "$1200", gradient: "from-rose-400 to-red-600" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl shadow-md text-white px-6 py-4 bg-gradient-to-r ${item.gradient}`}
          >
            <h4 className="text-md font-semibold">{item.title}</h4>
            <p className="text-2xl md:text-3xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Monthly Salary</h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#6366f1" barSize={25} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-2xl shadow-md flex justify-center items-center"
        >
          <Calendar className="scale-[0.85]" />
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
