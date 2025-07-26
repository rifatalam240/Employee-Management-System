import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserTie, FaMoneyBillWave, FaFireAlt } from "react-icons/fa";
import useAxiossecure from "../coustomHook/useAxiossecure";

const AllEmployeeList = () => {
  const axiosSecure = useAxiossecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified-users");
      return res.data;
    },
  });
  // console.log(users.isFired);

  // Make HR
  const handleMakeHR = async (id) => {
    try {
      await axiosSecure.patch(`/make-hr/${id}`);
      queryClient.invalidateQueries({ queryKey: ["verified-users"] });
    } catch (err) {
      Swal.fire("Error", "Failed to promote to HR", "error");
    }
  };

  // Fire user
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
      try {
        await axiosSecure.patch(`/fire-user/${id}`);
        queryClient.invalidateQueries({ queryKey: ["verified-users"] });
        Swal.fire("Fired!", "User has been fired.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to fire user", "error");
      }
    }
  };

  // Salary update
  const handleSalaryUpdate = async (id, oldSalary, newSalary, inputRef) => {
    if (isNaN(newSalary) || newSalary < oldSalary) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Salary",
        text: "You can't decrease the salary!",
      });
      if (inputRef) inputRef.value = oldSalary;
      return;
    }

    if (newSalary > oldSalary) {
      try {
        await axiosSecure.patch(`/update-salary/${id}`, { salary: newSalary });
        queryClient.invalidateQueries({ queryKey: ["verified-users"] });
        Swal.fire({
          icon: "success",
          title: "Salary Updated",
          text: `New salary: ৳${newSalary}`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.response?.data?.message || "Something went wrong",
        });
        if (inputRef) inputRef.value = oldSalary;
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        All Verified Employees
      </h2>
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
                      title="Make HR"
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
                    <span className="text-red-500 font-semibold">Fired</span>
                  ) : (
                    <button
                      onClick={() => handleFire(user._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      title="Fire"
                    >
                      <FaFireAlt />
                    </button>
                  )}
                </td>

                {/* Salary */}
                <td>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      defaultValue={user.salary || 0}
                      min={user.salary || 0}
                      disabled={user.isFired}
                      className="w-24 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
                      onBlur={(e) =>
                        handleSalaryUpdate(
                          user._id,
                          user.salary,
                          parseInt(e.target.value),
                          e.target
                        )
                      }
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
