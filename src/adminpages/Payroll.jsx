import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../coustomHook/useAxiossecure";
import { loadStripe } from "@stripe/stripe-js";
import { FaList, FaTh } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  const { data: payrolls = [], isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  const handlePayAndApprove = async (pay) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to pay and approve this salary.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay & Approve",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: pay.amount,
        payrollId: pay._id,
        email: pay.email,
        name: pay.name,
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
      }
    } catch (err) {
      Swal.fire("Error!", "Payment initiation failed!", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-base font-medium text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#063C4C]">
          Payroll Approval Requests
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="flex items-center gap-2 px-3 py-1 text-sm rounded bg-[#0E5D6A] text-white hover:bg-[#09454e] transition"
        >
          {viewMode === "table" ? <FaTh /> : <FaList />}
          {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {/* ---------------- TABLE VIEW ---------------- */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto w-full bg-white rounded shadow-md p-2">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-[#0E5D6A] text-white">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-center">Month</th>
                <th className="py-2 px-3 text-center">Year</th>
                <th className="py-2 px-3 text-center">Amount</th>
                <th className="py-2 px-3 text-center">Pay Date</th>
                <th className="py-2 px-3 text-center">Status</th>
                <th className="py-2 px-3 text-center">Action</th>
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
                    className="border-b hover:bg-blue-50 transition text-xs"
                  >
                    <td className="py-2 px-3 font-medium break-words max-w-[120px]">
                      {pay.name}
                    </td>
                    <td className="py-2 px-3 break-words max-w-[160px]">
                      {pay.email}
                    </td>
                    <td className="py-2 px-3 text-center">{pay.month}</td>
                    <td className="py-2 px-3 text-center">{pay.year}</td>
                    <td className="py-2 px-3 text-center text-[#0E5D6A] font-semibold">
                      ৳{Number(pay.amount).toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {pay.payDate
                        ? new Date(pay.payDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {pay.paid ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-semibold">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px] font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => handlePayAndApprove(pay)}
                        disabled={pay.paid}
                        className={`px-3 py-1 rounded text-[10px] font-semibold transition ${
                          pay.paid
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-[#0E5D6A] text-white hover:bg-[#09454e]"
                        }`}
                      >
                        {pay.paid ? "Approved" : "Pay & Approve"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // ---------------- CARD VIEW ----------------
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {payrolls.length === 0 ? (
            <p className="text-center text-gray-0">No payroll data found.</p>
          ) : (
            payrolls.map((pay) => (
              <div
                key={pay._id}
                className="bg-white rounded-lg shadow p-4 text-sm border hover:shadow-md"
              >
                <h3 className="font-semibold text-[#063C4C] text-base mb-1">
                  {pay.name}
                </h3>
                <p className="text-gray-700 mb-1 break-words">{pay.email}</p>
                <p className="mb-1">
                  <b>Month:</b> {pay.month} | <b>Year:</b> {pay.year}
                </p>
                <p className="mb-1">
                  <b>Amount:</b> ৳{Number(pay.amount).toLocaleString()}
                </p>
                <p className="mb-1">
                  <b>Pay Date:</b>{" "}
                  {pay.payDate
                    ? new Date(pay.payDate).toLocaleDateString()
                    : "-"}
                </p>
                <p className="mb-2">
                  <b>Status:</b>{" "}
                  {pay.paid ? (
                    <span className="text-green-600 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handlePayAndApprove(pay)}
                  disabled={pay.paid}
                  className={`w-full py-1 rounded text-sm font-medium transition ${
                    pay.paid
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#0E5D6A] text-white hover:bg-[#09454e]"
                  }`}
                >
                  {pay.paid ? "Approved" : "Pay & Approve"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Payroll;
