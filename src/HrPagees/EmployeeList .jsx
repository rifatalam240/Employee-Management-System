import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import UseAuth from "../context/UseAuth";
import Loading_spinner from "../Pages/LoadingPage";

const EmployeeList = () => {
  const axiosSecure = useAxiossecure();
  const navigate = useNavigate();
  const { user,role, loading } = UseAuth();
  const isHR = role === "hr";
  // console.log("userrole", user.role);
  console.log("ishr", isHR);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const toggleVerified = async (id, currentStatus) => {
    if (!isHR) {
      Swal.fire("Forbidden", "Only HR can update verification", "error");
      return;
    }

    try {
      await axiosSecure.patch(`/users/verify/${id}`, {
        isVerified: !currentStatus,
      });
      Swal.fire("Success", "Verification status updated.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update verification.", "error");
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
      transactionId: uuidv4(),
    };

    try {
      const res = await axiosSecure.post("/payments", paymentData);
      if (res.data.insertedId) {
        toast.success("✅ Payment request sent!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("❌ Already paid for this month!");
      } else {
        toast.error("❌ Payment failed!");
      }
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-[#0E5D6A] font-semibold">
        Loading employees...
      </p>
    );
  if (loading) {
    return <Loading_spinner></Loading_spinner>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#0E5D6A]">
        Employee List
      </h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#0E5D6A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Verified</th>
              <th className="py-3 px-4 text-left">Bank Account</th>
              <th className="py-3 px-4 text-left">Salary</th>
              <th className="py-3 px-4 text-center">Pay</th>
              <th className="py-3 px-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="even:bg-gray-50 hover:bg-[#e6f4f7]">
                <td className="py-3 px-4">{emp.name}</td>
                <td className="py-3 px-4">{emp.email}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleVerified(emp._id, emp.isVerified)}
                    disabled={!isHR}
                    className={`text-xl ${
                      !isHR ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    title={
                      emp.isVerified ? "Click to unverify" : "Click to verify"
                    }
                  >
                    {emp.isVerified ? "✅" : "❌"}
                  </button>
                </td>
                <td className="py-3 px-4">{emp.bankAccount || "N/A"}</td>
                <td className="py-3 px-4 font-semibold text-[#0E5D6A]">
                  ৳{Number(emp.salary).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handlePayClick(emp)}
                    disabled={!emp.isVerified}
                    className={`text-white px-3 py-1 rounded ${
                      emp.isVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      emp.isVerified
                        ? "Click to pay"
                        : "Cannot pay unverified employee"
                    }
                  >
                    Pay
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/hr/details/${emp.email}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for salary payment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#0E5D6A]">
              Pay Salary to {selectedEmployee?.name}
            </h3>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Salary</label>
              <input
                type="text"
                value={`৳${Number(selectedEmployee.salary).toLocaleString()}`}
                disabled
                className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
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
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                min="2000"
                max={new Date().getFullYear() + 5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
