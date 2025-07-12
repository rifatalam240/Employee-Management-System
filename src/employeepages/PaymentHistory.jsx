// PaymentHistory.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../context/UseAuth";
import useAxiossecure from "../coustomHook/useAxiossecure";

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.map((item) => (
              <tr key={item._id}>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>{item.amount} ৳</td>
                <td>{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(pages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                page === num ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
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
