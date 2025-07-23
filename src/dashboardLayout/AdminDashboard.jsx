import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const axiosSecure = useAxiossecure();

  // Get all users with loading and error state
  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Change user role
  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      Swal.fire("✅ Updated!", "User role updated successfully.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error!", "Failed to update role", "error");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${id}`);
        Swal.fire("🗑️ Deleted!", "User has been deleted.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("❌ Error!", "Failed to delete user", "error");
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-16 text-red-600 font-semibold">
        ❌ Failed to load users. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">👤 All Users (Admin Panel)</h2>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="w-full table-auto min-w-[700px]">
          <thead className="bg-[#0E5D6A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="hr">HR</option>
                      <option value="employee">Employee</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
