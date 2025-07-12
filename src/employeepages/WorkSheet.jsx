// WorkSheet.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiossecure from "../coustomHook/useAxiossecure";
import UseAuth from "../context/UseAuth";
import Swal from "sweetalert2";

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

  // Fetch employee-specific data
  const { data: workEntries = [] } = useQuery({
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
      Swal.fire("Success", "Work added successfully!", "success");
    },
  });

  const updateWorkMutation = useMutation({
    mutationFn: ({ id, updatedData }) => axiosSecure.patch(`/works/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("Updated", "Work updated successfully", "success");
      setEditing(null);
      reset();
    },
  });

  const deleteWork = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/works/${id}`);
      queryClient.invalidateQueries(["works", user?.email]);
      Swal.fire("Deleted!", "Work entry deleted.", "success");
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
    reset();
    setSelectedDate(new Date());
  };

  const handleEdit = (entry) => {
    setEditing(entry);
    setValue("task", entry.task);
    setValue("hours", entry.hours);
    setSelectedDate(new Date(entry.date));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Work Sheet</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-2 mb-6 items-center">
        <select
          {...register("task", { required: true })}
          className="border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Select Task
          </option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>

        <input
          type="number"
          {...register("hours", { required: true })}
          placeholder="Hours Worked"
          className="border p-2 rounded"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {workEntries.map((entry) => (
              <tr key={entry._id}>
                <td className="text-left">{entry.task}</td>
                <td>{entry.hours}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 my-1 rounded"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteWork(entry._id)}
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

export default WorkSheet;
