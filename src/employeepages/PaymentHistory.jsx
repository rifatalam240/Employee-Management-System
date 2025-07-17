import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../context/UseAuth";
import useAxiossecure from "../coustomHook/useAxiossecure";

const PRIMARY_COLOR = "#0E5D6A";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiossecure();
  const [page, setPage] = useState(0);
  const limit = 5;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["payments", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const total = data.total || 0;
  const pages = Math.ceil(total / limit);

  if (isLoading) return <p className="text-center mt-8 text-gray-600">Loading payment history...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Payment History</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-[#0E5D6A] text-white">
            <tr>
              <th className="py-3 px-5">Month</th>
              <th className="py-3 px-5">Year</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data.payments && data.payments.length > 0 ? (
              data.payments.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-5">{item.month || "N/A"}</td>
                  <td className="py-3 px-5">{item.year || "N/A"}</td>
                  <td className="py-3 px-5 font-semibold">{item.amount} ৳</td>
                  <td className="py-3 px-5 font-mono text-sm break-all">{item.transactionId || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {pages > 1 && (
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {[...Array(pages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                page === num
                  ? "bg-[#0E5D6A] text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-[#0E5D6A] hover:text-white"
              }`}
              aria-label={`Go to page ${num + 1}`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
