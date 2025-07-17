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
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: workEntries = [], isLoading } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user.email}`);
      return res.data;
    },
  });

  const addWorkMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/works", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("✅ Success", "Work added successfully!", "success");
      reset();
      setSelectedDate(new Date());
      setEditing(null);
    },
  });

  const updateWorkMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axiosSecure.patch(`/works/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("✅ Updated", "Work updated successfully", "success");
      setEditing(null);
      reset();
      setSelectedDate(new Date());
    },
  });

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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      date: selectedDate,
      email: user.email,
    };
    if (editing) {
      updateWorkMutation.mutate({ id: editing._id, updatedData: payload });
    } else {
      addWorkMutation.mutate(payload);
    }
  };

  const handleEdit = (entry) => {
    setEditing(entry);
    setValue("task", entry.task);
    setValue("hours", entry.hours);
    setValue("description", entry.description);
    setSelectedDate(new Date(entry.date));
  };

  if (isLoading)
    return (
      <p className="text-center mt-6 text-gray-600">Loading work entries...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        📝 Work Sheet
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 md:space-y-0 md:flex md:gap-4 flex-wrap"
      >
        {/* Task */}
        <div className="flex-1 min-w-[250px]">
          <label className="block font-medium mb-1">Task</label>
          <select
            {...register("task", { required: "Task is required" })}
            className={`w-full border rounded px-3 py-2 ${
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
        <div className="flex-1 min-w-[250px]">
          <label className="block font-medium mb-1">Hours</label>
          <input
            type="number"
            {...register("hours", {
              required: "Hours required",
              min: { value: 0.5, message: "Min 0.5 hr" },
              max: { value: 24, message: "Max 24 hr" },
            })}
            step="0.5"
            className={`w-full border rounded px-3 py-2 ${
              errors.hours ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Hours Worked"
          />
          {errors.hours && (
            <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description required",
              minLength: { value: 10, message: "Minimum 10 characters" },
            })}
            className={`w-full border rounded px-3 py-2 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
            placeholder="Brief about your work..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="flex-1 min-w-[250px]">
          <label className="block font-medium mb-1">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full border rounded px-3 py-2"
            dateFormat="dd MMM yyyy"
            maxDate={new Date()}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end min-w-[200px]">
          <button
            type="submit"
            className="bg-[#0E5D6A] text-white px-6 py-2 rounded w-full hover:bg-[#09454e] transition"
          >
            {editing ? "Update" : "Add"}
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
            {workEntries.length === 0 ? (
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
                  <td className="px-4 py-3">{entry.task}</td>
                  <td className="px-4 py-3">{entry.hours}</td>
                  <td className="px-4 py-3">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-left" title={entry.description}>
                    {entry.description.length > 40
                      ? entry.description.slice(0, 40) + "..."
                      : entry.description}
                  </td>

                  <td className="px-4 py-3 space-x-2">
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
    </div>
  );
};

export default WorkSheet;
