// import React, { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../coustomHook/useAxiossecure";
// import Swal from "sweetalert2";
// import PaymentForm from "../payment/PaymentForm";
// import StripeProvider from "../payment/StripeProvider";

// const Payroll = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const { data: payrolls = [], isLoading } = useQuery({
//     queryKey: ["payroll"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/payroll");
//       return res.data;
//     },
//   });

//   // Modal state for payment form
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Payroll Approval Requests</h2>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Month</th>
//               <th>Year</th>
//               <th>Amount</th>
//               <th>Pay Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payrolls.map((pay) => (
//               <tr key={pay._id}>
//                 <td>{pay.name}</td>
//                 <td>{pay.email}</td>
//                 <td>{pay.month}</td>
//                 <td>{pay.year}</td>
//                 <td>৳{pay.amount}</td>
//                 <td>{pay.payDate ? new Date(pay.payDate).toLocaleDateString() : "-"}</td>
//                 <td>
//                   {pay.paid ? (
//                     <button className="text-green-600" disabled>
//                       Paid
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setSelectedPayment(pay)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Pay
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Payment Modal */}
//      {selectedPayment && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
//       <button
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         onClick={() => setSelectedPayment(null)}
//       >
//         ✕
//       </button>

//       <h3 className="text-xl font-semibold mb-4">
//         Pay ৳{selectedPayment.amount} to {selectedPayment.name}
//       </h3>

//       <StripeProvider>
//         <PaymentForm
//           amount={selectedPayment.amount}
//           email={selectedPayment.email}
//           month={selectedPayment.month}
//           year={selectedPayment.year}
//           onSuccess={() => {
//             Swal.fire("Success", "Payment Completed!", "success");
//             setSelectedPayment(null);
//             queryClient.invalidateQueries(["payroll"]);
//           }}
//         />
//       </StripeProvider>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Payroll;
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
        console.error(err);
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 md:p-6">
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
              <th>Status</th>
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
                  {pay.approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td>
                  {pay.approved ? (
                    <button disabled className="text-gray-400">Approved</button>
                  ) : (
                    <button
                      onClick={() => handleApprove(pay._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Approve
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
