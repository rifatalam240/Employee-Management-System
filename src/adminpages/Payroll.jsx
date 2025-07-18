import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../coustomHook/useAxiossecure";

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

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this salary payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/payroll/pay/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Approved!", "The salary payment is approved.", "success");
          queryClient.invalidateQueries(["payroll"]);
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-lg font-semibold text-gray-500">Loading...</span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#063C4C]">
        Payroll Approval Requests
      </h2>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-[700px] w-full table-auto">
          <thead className="bg-[#0E5D6A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Month</th>
              <th className="py-3 px-4 text-center">Year</th>
              <th className="py-3 px-4 text-center">Amount</th>
              <th className="py-3 px-4 text-center">Pay Date</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No payroll requests found.
                </td>
              </tr>
            ) : (
              payrolls.map((pay) => (
                <tr
                  key={pay._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4 font-semibold">{pay.name}</td>
                  <td className="py-3 px-4 break-words max-w-xs">{pay.email}</td>
                  <td className="py-3 px-4 text-center">{pay.month}</td>
                  <td className="py-3 px-4 text-center">{pay.year}</td>
                  <td className="py-3 px-4 text-center font-semibold text-[#0E5D6A]">
                    ৳{Number(pay.amount).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {pay.payDate
                      ? new Date(pay.payDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {pay.approved ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {pay.approved ? (
                      <button
                        disabled
                        className="px-4 py-1 rounded bg-gray-200 text-gray-500 cursor-not-allowed"
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(pay._id)}
                        className="px-4 py-1 rounded bg-[#0E5D6A] text-white hover:bg-[#09454e] transition"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center text-gray-500 text-sm">
        <span className="block md:hidden">
          <b>Tip:</b> Swipe left/right to see all columns.
        </span>
      </div>
    </div>
  );
};

export default Payroll;