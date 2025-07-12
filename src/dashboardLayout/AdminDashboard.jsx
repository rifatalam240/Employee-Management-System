// AdminDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const axiossecure = useAxiossecure();

  // Get all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiossecure.get("/users");
      return res.data;
    },
  });

  // Change role
  const handleRoleChange = async (id, newRole) => {
    try {
      await axiossecure.patch(`/users/role/${id}`, { role: newRole });
      Swal.fire("Updated!", "User role updated.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Toggle verification
  const handleVerifyToggle = async (id, currentStatus) => {
    try {
      await axiossecure.patch(`/users/verify/${id}`, { isVerified: !currentStatus });
      Swal.fire("Updated!", "Verification status updated.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiossecure.delete(`/users/${id}`);
        Swal.fire("Deleted!", "User deleted.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="border px-2 py-1"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                  </select>
                </td>
                <td>
                  <button
                    className={`px-3 py-1 text-sm rounded ${user.isVerified ? "bg-green-500" : "bg-yellow-500"}`}
                    onClick={() => handleVerifyToggle(user._id, user.isVerified)}
                  >
                    {user.isVerified ? "Verified" : "Not Verified"}
                  </button>
                </td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
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

export default AdminDashboard;
