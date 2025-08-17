
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import UseAuth from "../context/UseAuth";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#0E5D6A";

const WorkSheet = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiossecure();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch work entries for this user
  const { data: workEntries = [], isLoading } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user.email}`);
      return res.data;
    },
  });

  // Add work
  const addWorkMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/works", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("✅ Success", "Work added successfully!", "success");
      reset();
      setSelectedDate(new Date());
    },
  });

  // Update work
  const updateWorkMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axiosSecure.patch(`/works/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("✅ Updated", "Work updated successfully", "success");
      setEditModalOpen(false);
      setEditingEntry(null);
    },
  });

  // Delete work
  const deleteWork = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#aaa",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/works/${id}`);
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("🗑️ Deleted!", "Work entry deleted.", "success");
    }
  };

  // Add work submit
  const onSubmit = (data) => {
    const payload = {
      ...data,
      hours: parseFloat(data.hours),
      date: selectedDate,
      email: user.email,
    };
    addWorkMutation.mutate(payload);
  };

  // Edit button handler
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setEditModalOpen(true);
  };

  // Edit modal submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      task: form.task.value,
      hours: parseFloat(form.hours.value),
      description: form.description.value,
      date: new Date(form.date.value),
      email: user.email,
    };
    updateWorkMutation.mutate({ id: editingEntry._id, updatedData });
  };

  if (isLoading)
    return (
      <p className="text-center mt-6 text-gray-600">Loading work entries...</p>
    );

  return (
    <div className="max-w-6xl mx-auto dark:bg-gray-900 p-4">
      <h2 className="text-3xl font-semibold dark:text-gray-300 mb-6 text-center text-gray-800">
        📝 Work Sheet
      </h2>

      {/* Horizontal Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-end gap-4 flex-wrap"
      >
        {/* Task */}
        <div className="flex-1 min-w-[180px]">
          <label className="block font-medium mb-1  dark:text-gray-500 ">Task</label>
          <select
            {...register("task", { required: "Task is required" })}
            className={`w-full dark:bg-gray-900 border rounded px-3 py-2 ${
              errors.task ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
          {errors.task && (
            <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
          )}
        </div>

        {/* Hours */}
        <div className="flex-1 min-w-[120px]">
          <label className="block font-medium mb-1 dark:text-gray-500">Hours</label>
          <input
            type="number"
            step="0.5"
            {...register("hours", {
              required: "Hours required",
              min: { value: 0.5, message: "Min 0.5 hr" },
              max: { value: 24, message: "Max 24 hr" },
            })}
            className={`w-full dark:bg-gray-900 border rounded px-3 py-2 ${
              errors.hours ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Hours Worked"
          />
          {errors.hours && (
            <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="flex-1 min-w-[160px]">
          <label className="block font-medium mb-1  dark:text-gray-500">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full dark:bg-gray-900 border rounded px-3 py-2"
            dateFormat="dd MMM yyyy"
            maxDate={new Date()}
            name="date"
            required
          />
        </div>

        {/* Description */}
        <div className="flex-1 min-w-[200px]">
          <label className="block font-medium mb-1 dark:text-gray-500">Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Description required",
              minLength: { value: 10, message: "Minimum 10 characters" },
            })}
            className={`w-full border rounded px-3  py-2  ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Brief about your work..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-end min-w-[120px]">
          <button
            type="submit"
            className="bg-[#0E5D6A] text-white px-6 py-2 rounded w-full hover:bg-[#09454e] transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="mt-8 overflow-x-auto rounded shadow bg-white">
        <table className="w-full table-auto min-w-[600px]">
          <thead className="bg-[#0E5D6A] text-white">
            <tr>
              <th className="py-3 px-4">Task</th>
              <th className="py-3 px-4">Hours</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workEntries?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No work entries found.
                </td>
              </tr>
            ) : (
              workEntries.map((entry) => (
                <tr
                  key={entry._id}
                  className="hover:bg-gray-50 transition text-center"
                >
                  <td className="px-4 dark:text-gray-400 py-3">{entry.task}</td>
                  <td className="px-4 dark:text-gray-400 py-3">{entry.hours}</td>
                  <td className="px-4 dark:text-gray-400 py-3">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 dark:text-gray-400 text-left" title={entry.description}>
                    {entry?.description?.length > 40
                      ? entry.description.slice(0, 40) + "..."
                      : entry.description || "N/A"}
                  </td>
                  <td className="px-4 py-3 space-x-2 flex">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWork(entry._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

      {/* Edit Modal */}
      {editModalOpen && editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[90%] max-w-md shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#0E5D6A]">
              Edit Work Entry
            </h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Task</label>
              <select
                name="task"
                defaultValue={editingEntry.task}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              >
                <option value="">Select Task</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Hours</label>
              <input
                type="number"
                name="hours"
                step="0.5"
                min="0.5"
                max="24"
                defaultValue={editingEntry.hours}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={editingEntry.date ? new Date(editingEntry.date).toISOString().split("T")[0] : ""}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                defaultValue={editingEntry.description}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                rows={3}
                minLength={10}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditModalOpen(false);
                  setEditingEntry(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;