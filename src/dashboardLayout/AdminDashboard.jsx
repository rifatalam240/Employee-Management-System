import useAllUsers from "../coustomHook/useAllUsers ";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const { data: users = [], refetch } = useAllUsers();
  const axiossecure = useAxiossecure();

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiossecure.delete(`/users/${id}`);
      Swal.fire("Deleted!", "User has been deleted.", "success");
      refetch();
    }
  };

  const handleRoleChange = async (id, role) => {
    await axiossecure.patch(`/users/role/${id}`, { role });
    Swal.fire("Success", "Role Updated", "success");
    refetch();
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center border-t">
              <td className="p-2">
                <img src={user.image} className="w-10 h-10 rounded-full mx-auto" />
              </td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2 flex justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handleRoleChange(user._id, "admin")}
                  disabled={user.role === "admin"}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "hr")}
                  disabled={user.role === "hr"}
                  className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                >
                  Make HR
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
