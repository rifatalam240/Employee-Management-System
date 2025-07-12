// HRDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const HRDashboard = () => {
  const axiossecure = useAxiossecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["all-employees"],
    queryFn: async () => {
      const res = await axiossecure.get("/users");
      return res.data.filter((user) => user.role === "employee");
    },
  });

  const handlePay = async (employee) => {
    const paymentInfo = {
      employeeId: employee._id,
      name: employee.name,
      email: employee.email,
      amount: employee.salary,
      date: new Date(),
    };

    try {
      const res = await axiossecure.post("/payments", paymentInfo);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Payment recorded successfully.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Payment failed", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employee Salary Management</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>${emp.salary}</td>
                <td>
                  <button
                    className="bg-green-500 px-3 py-1 text-white rounded"
                    onClick={() => handlePay(emp)}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboard;
