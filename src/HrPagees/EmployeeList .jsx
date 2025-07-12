import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast"; // added toast import

const EmployeeList = () => {
  const axiosSecure = useAxiossecure();
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: employees = [], refetch, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const toggleVerified = async (id, currentStatus) => {
    try {
      await axiosSecure.patch(`/users/verify/${id}`, {
        isVerified: !currentStatus,
      });
      Swal.fire(
        "Success",
        `Employee has been ${!currentStatus ? "verified" : "unverified"}.`,
        "success"
      );
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update verification status.", "error");
    }
  };

  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setMonth("");
    setYear(new Date().getFullYear());
    setIsModalOpen(true);
  };

  const handlePayNow = async () => {
    if (!month || !year) {
      Swal.fire("Warning", "Please select both month and year.", "warning");
      return;
    }

    const paymentData = {
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      amount: selectedEmployee.salary,
      month,
      year: parseInt(year),
      transactionId: `TXN-${Math.floor(Math.random() * 100000)}`,
    };

    try {
      const res = await axiosSecure.post("/payments", paymentData);
      if (res.data.insertedId) {
        toast.success("✅ Payment successful!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("❌ Already paid this month!");
      } else {
        toast.error("❌ Payment failed!");
      }
    }
  };

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee List</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-collapse border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Verified</th>
              <th className="border p-2">Bank Account</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Pay</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="border p-2">{emp.name}</td>
                <td className="border p-2">{emp.email}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => toggleVerified(emp._id, emp.isVerified)}
                    className="text-xl"
                    title={
                      emp.isVerified
                        ? "Click to unverify"
                        : "Click to verify"
                    }
                  >
                    {emp.isVerified ? "✅" : "❌"}
                  </button>
                </td>
                <td className="border p-2">{emp.bankAccount || "N/A"}</td>
                <td className="border p-2">৳{emp.salary}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handlePayClick(emp)}
                    disabled={!emp.isVerified}
                    className={`text-white px-3 py-1 rounded ${
                      emp.isVerified
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      emp.isVerified
                        ? "Pay Salary"
                        : "Cannot pay unverified employee"
                    }
                  >
                    Pay
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => navigate(`/dashboard/hr/details/${emp.email}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    title="View Details"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Pay Salary to {selectedEmployee?.name}
            </h3>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              >
                <option value="">Select Month</option>
                {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1 rounded"
                min="2000"
                max={new Date().getFullYear() + 5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
