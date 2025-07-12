// src/AdminPages/Payroll.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: payrolls = [], isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/payroll/pay/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["payroll"]);
      Swal.fire("Success", "Payment Completed!", "success");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Approval Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Pay Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((pay) => (
              <tr key={pay._id}>
                <td>{pay.name}</td>
                <td>{pay.email}</td>
                <td>{pay.month}</td>
                <td>{pay.year}</td>
                <td>৳{pay.amount}</td>
                <td>{pay.payDate ? new Date(pay.payDate).toLocaleDateString() : "-"}</td>
                <td>
                  {pay.paid ? (
                    <button className="text-green-600" disabled>Paid</button>
                  ) : (
                    <button
                      onClick={() => mutation.mutate(pay._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
