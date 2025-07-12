import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiossecure from "../coustomHook/useAxiossecure";
import { useQuery } from "@tanstack/react-query";

const HRPayment = () => {
  console.log("HRPayment component rendered");
  const axiosSecure = useAxiossecure();
  const { register, handleSubmit, reset } = useForm();

  // Employees API থেকে ডাটা লোড
  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      console.log("✅ Employees:", res.data);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/payments", data);

      Swal.fire({
        icon: "success",
        title: "Payment Success!",
        text: "Salary paid successfully.",
      });

      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text: err.message,
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load employees.</p>
    );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pay Employee Salary
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Employee Email Select */}
        <div>
          <label className="block mb-1 font-medium">Employee Email</label>
          <select
            {...register("email", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select employee
            </option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.email}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label className="block mb-1 font-medium">Month</label>
          <select
            {...register("month", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
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
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-medium">Year</label>
          <input
            type="number"
            {...register("year", { required: true })}
            className="w-full border px-3 py-2 rounded"
            defaultValue={new Date().getFullYear()}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount (৳)</label>
          <input
            type="number"
            {...register("amount", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block mb-1 font-medium">Transaction ID</label>
          <input
            type="text"
            {...register("transactionId", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default HRPayment;
