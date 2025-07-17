import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // make sure you installed uuid
import { toast } from "react-hot-toast"; // if you want toast notifications

const HRDashboard = () => {
  const axiosSecure = useAxiossecure();

  // State for month/year inputs and selected employee
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch employees
  const {
    data: employees = [],
    isLoading: loadingEmployees,
    error: employeesError,
  } = useQuery({
    queryKey: ["all-employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "employee");
    },
  });

  // Fetch payments
  const {
    data: paymentData = {},
    isLoading: loadingPayments,
    error: paymentsError,
    refetch,
  } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const payments = paymentData.payments || [];

  if (loadingEmployees || loadingPayments)
    return <p className="text-center mt-10">Loading...</p>;
  if (employeesError || paymentsError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading data.
      </p>
    );

  // Handler to open modal and select employee for payment
  const openPaymentModal = (emp) => {
    setSelectedEmployee(emp);
    setMonth(""); // reset month/year if needed
    setYear(new Date().getFullYear());
    setIsModalOpen(true);
  };

  // Handle payment
  const handlePayNow = async () => {
    if (!month || !year) {
      Swal.fire("Warning", "Please select both month and year.", "warning");
      return;
    }
    if (!selectedEmployee) {
      Swal.fire("Error", "No employee selected.", "error");
      return;
    }

    const paymentData = {
      email: selectedEmployee.email,
      amount: Number(selectedEmployee.salary),
      month,
      year: parseInt(year),
      transactionId: uuidv4(),
    };

    try {
      const res = await axiosSecure.post("/payments", paymentData);
      if (res.data.insertedId) {
        toast.success("✅ Payment request created!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        toast.error("❌ Already paid this month!");
      } else {
        toast.error("❌ Payment failed!");
      }
    }
  };

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-3xl font-bold mb-6 text-[#0E5D6A]">HR Dashboard</h2>

      {/* Employee Salary Management */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#0E5D6A]">
          Employee Salary Management
        </h3>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#0E5D6A] text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Designation</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Salary</th>
                <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Pay</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr
                  key={emp._id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#e6f4f7] transition-colors`}
                >
                  <td className="py-3 px-4">{emp.name}</td>
                  <td className="py-3 px-4 break-words max-w-xs">{emp.email}</td>
                  <td className="py-3 px-4">{emp.designation || "N/A"}</td>
                  <td className="py-3 px-4 font-semibold text-[#0E5D6A]">{Number(emp.salary).toLocaleString()} ৳</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openPaymentModal(emp)}
                      className="bg-[#0E5D6A] hover:bg-[#0b4b56] text-white font-semibold py-1 px-3 rounded transition"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No employee data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-[#0E5D6A]">
              Pay Salary to {selectedEmployee?.name}
            </h3>

            <div className="mb-4">
              <label htmlFor="month" className="block mb-1 font-medium">
                Month
              </label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="year" className="block mb-1 font-medium">
                Year
              </label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={2000}
                max={2100}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                className="px-4 py-2 bg-[#0E5D6A] text-white rounded hover:bg-[#0b4b56]"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
