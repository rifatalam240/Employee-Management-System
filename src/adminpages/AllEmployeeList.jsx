import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserTie, FaMoneyBillWave, FaFireAlt } from "react-icons/fa";
import useAxiossecure from "../coustomHook/useAxiossecure";

const AllEmployeeList = () => {
  const axiosSecure = useAxiossecure();
  const queryClient = useQueryClient();
  //  headers: {
  //           authorization: `Bearer ${user.accessToken}`,
  //           "Content-Type": "application/json",
  //         },

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified-users");
      return res.data;
    },
  });

  const handleMakeHR = async (id) => {
    await axiosSecure.patch(`/make-hr/${id}`);
    queryClient.invalidateQueries({ queryKey: ["verified-users"] });
  };

  const handleFire = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to fire this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, fire!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/fire-user/${id}`);
      queryClient.invalidateQueries({ queryKey: ["verified-users"] });
      Swal.fire("Fired!", "User has been fired.", "success");
    }
  };

  const handleSalaryUpdate = async (id, salary) => {
    await axiosSecure.patch(`/update-salary/${id}`, { salary: parseInt(salary) });
    queryClient.invalidateQueries({ queryKey: ["verified-users"] });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">All Verified Employees</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>Name</th>
              <th>Designation</th>
              <th>Make HR</th>
              <th>Fire</th>
              <th>Salary (৳)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td>{user.name}</td>
                <td>{user.designation || "N/A"}</td>

                {/* Make HR */}
                <td>
                  {user.role === "employee" ? (
                    <button
                      onClick={() => handleMakeHR(user._id)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <FaUserTie />
                    </button>
                  ) : (
                    <span className="text-green-600">Already HR</span>
                  )}
                </td>

                {/* Fire */}
                <td>
                  {user.isFired ? (
                    <span className="text-red-500">Fired</span>
                  ) : (
                    <button
                      onClick={() => handleFire(user._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaFireAlt />
                    </button>
                  )}
                </td>

                {/* Salary */}
                <td>
                  <div className="flex gap-2 items-center">
                    <input
                      defaultValue={user.salary || 0}
                      type="number"
                      min={0}
                      className="w-24 border px-2 py-1 rounded"
                      onBlur={(e) => handleSalaryUpdate(user._id, e.target.value)}
                    />
                    <FaMoneyBillWave className="text-green-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;
