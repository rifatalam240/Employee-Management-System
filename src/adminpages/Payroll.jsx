import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaList, FaTh } from "react-icons/fa";
import PaymentForm from "../payment/PaymentForm";
import StripeProvider from "../payment/StripeProvider";
import useAxiossecure from "../coustomHook/useAxiossecure";

const Payroll = () => {
  const axiosSecure = useAxiossecure();
  const [viewMode, setViewMode] = useState("table");
  const [selectedPay, setSelectedPay] = useState(null);

  const {
    data: payrolls = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  const handlePayClick = (pay) => {
    // console.log(pay);
    Swal.fire({
      title: "Proceed to Payment?",
      text: `Pay ৳${pay.amount} to ${pay.email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPay(pay);
      }
    });
  };
  // Filter: unique combination per email-month-year, keeping only one (prefer paid:true)
  const filteredPayrolls = Object.values(
    payrolls.reduce((acc, curr) => {
      const key = `${curr.email}-${curr.month}-${curr.year}`;
      if (!acc[key]) {
        acc[key] = curr;
      } else {
        // যদি আগেরটা pending আর নতুনটা paid হয়, তাহলে paid টাই রাখো
        if (!acc[key].paid && curr.paid) {
          acc[key] = curr;
        }
      }
      return acc;
    }, {})
  );

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payroll Approval Requests</h2>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="flex items-center gap-2 px-3 py-1 rounded bg-[#0E5D6A] text-white"
        >
          {viewMode === "table" ? <FaTh /> : <FaList />}
          {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>
      {/* {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border">
            <thead className="bg-[#0E5D6A] text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Month</th>
                <th className="p-2 text-center">Amount</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((pay) => (
                <tr key={pay._id} className="border-b">
                  <td className="p-2">{pay.name}</td>
                  <td className="p-2">{pay.email}</td>
                  <td className="p-2 text-center">{pay.month}</td>
                  <td className="p-2 text-center">৳{pay.amount}</td>
                  <td className="p-2 text-center">
                    {pay.paid ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handlePayClick(pay)}
                      disabled={pay.paid}
                      className={`px-3 py-1 rounded text-sm ${
                        pay.paid
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#0E5D6A] text-white"
                      }`}
                    >
                      {pay.paid ? "Approved" : "Pay & Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {payrolls.map((pay) => (
            <div key={pay._id} className="p-4 bg-white border rounded shadow">
              <h3 className="font-semibold">{pay.name}</h3>
              <p>{pay.email}</p>
              <p>Month: {pay.month}</p>
              <p>৳{pay.amount}</p>
              <p>
                Status:{" "}
                {pay.paid ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </p>
              <button
                onClick={() => handlePayClick(pay)}
                disabled={pay.paid}
                className={`w-full mt-2 py-1 text-sm rounded ${
                  pay.paid
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0E5D6A] text-white"
                }`}
              >
                {pay.paid ? "Approved" : "Pay & Approve"}
              </button>
            </div>
          ))}
        </div>
      )} */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border">
            <thead className="bg-[#0E5D6A] text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Month</th>
                <th className="p-2 text-center">Amount</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayrolls.map((pay) => (
                <tr key={pay._id} className="border-b">
                  <td className="p-2">{pay.name}</td>
                  <td className="p-2">{pay.email}</td>
                  <td className="p-2 text-center">{pay.month}</td>
                  <td className="p-2 text-center">৳{pay.amount}</td>
                  <td className="p-2 text-center">
                    {pay.paid ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handlePayClick(pay)}
                      disabled={pay.paid}
                      className={`px-3 py-1 rounded text-sm ${
                        pay.paid
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#0E5D6A] text-white"
                      }`}
                    >
                      {pay.paid ? "Approved" : "Pay & Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPayrolls.map((pay) => (
            <div key={pay._id} className="p-4 bg-white border rounded shadow">
              <h3 className="font-semibold">{pay.name}</h3>
              <p>{pay.email}</p>
              <p>Month: {pay.month}</p>
              <p>৳{pay.amount}</p>
              <p>
                Status:{" "}
                {pay.paid ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </p>
              <button
                onClick={() => handlePayClick(pay)}
                disabled={pay.paid}
                className={`w-full mt-2 py-1 text-sm rounded ${
                  pay.paid
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0E5D6A] text-white"
                }`}
              >
                {pay.paid ? "Approved" : "Pay & Approve"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {/* {selectedPay && (
        <StripeProvider>
          <PaymentForm
            amount={selectedPay.amount}
            email={selectedPay.email}
            month={selectedPay.month}
            year={selectedPay.year}
            payrollId={selectedPay._id}
            onSuccess={() => {
              setSelectedPay(null);
              refetch();
            }}
          />
        </StripeProvider>
      )} */}

      {selectedPay && (
        <StripeProvider>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedPay(null)}
          >
            <div
              className="bg-white p-6 rounded shadow-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PaymentForm
                amount={selectedPay.amount}
                email={selectedPay.email}
                month={selectedPay.month}
                year={selectedPay.year}
                payrollId={selectedPay._id}
                onSuccess={() => {
                  setSelectedPay(null);
                  refetch(); // update the table after successful payment
                }}
                onError={(errMessage) => {
                  setSelectedPay(null);
                  if (errMessage?.includes("Payment already exists")) {
                    Swal.fire({
                      icon: "warning",
                      title: "Duplicate Payment",
                      text: "This employee is already paid for this month.",
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Payment Failed",
                      text: errMessage || "Something went wrong",
                    });
                  }
                }}
              />
              <button
                onClick={() => setSelectedPay(null)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </StripeProvider>
      )}
    </div>
  );
};

export default Payroll;
