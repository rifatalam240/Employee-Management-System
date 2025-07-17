// import React, { useState, useEffect } from "react";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import useAxiossecure from "../coustomHook/useAxiossecure";
// import Swal from "sweetalert2";

// const PaymentForm = ({ amount, email, month, year, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiossecure();

//   const [clientSecret, setClientSecret] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [transactionId, setTransactionId] = useState("");

//   useEffect(() => {
//     axiosSecure
//       .post("/create-payment-intent", { amount })
//       .then((res) => setClientSecret(res.data.clientSecret))
//       .catch(() => Swal.fire("Error", "Failed to initiate payment", "error"));
//   }, [amount, axiosSecure]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setProcessing(true);
//     const card = elements.getElement(CardElement);

//     const { error: paymentMethodError, paymentMethod } =
//       await stripe.createPaymentMethod({
//         type: "card",
//         card,
//       });

//     if (paymentMethodError) {
//       Swal.fire("Payment Error", paymentMethodError.message, "error");
//       setProcessing(false);
//       return;
//     }

//     const { error: confirmError, paymentIntent } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//     if (confirmError) {
//       Swal.fire("Payment Confirmation Error", confirmError.message, "error");
//       setProcessing(false);
//       return;
//     }
//     console.log("Payment data:", {
//       amount,
//       email,
//       month,
//       year,
//       transactionId: "pending",
//     });

//     if (paymentIntent.status === "succeeded") {
//       setTransactionId(paymentIntent.id);

//       // try {
//       //   await axiosSecure.post("/payments", {
//       //     amount,
//       //     transactionId: paymentIntent.id,
//       //     email,
//       //     month,
//       //     year,
//       //     paid: true,
//       //   });
//       //   Swal.fire("Success", "Payment Successful", "success");
//       //   onSuccess && onSuccess(paymentIntent.id);
//       // } catch {
//       //   Swal.fire("Error", "Failed to record payment in database", "error");
//       // }
//       try {
//         await axiosSecure.post("/payments", {
//           amount,
//           transactionId: paymentIntent.id,
//           email,
//           month,
//           year,
//           paid: true,
//         });
//         Swal.fire("Success", "Payment Successful", "success");
//         onSuccess && onSuccess(paymentIntent.id);
//       } catch (error) {
//         console.error(
//           "Payment record error:",
//           error.response?.data || error.message
//         ); // <-- Console এ error দেখাবে
//         Swal.fire(
//           "Error",
//           "Failed to record payment in database: " +
//             (error.response?.data?.message || error.message),
//           "error"
//         );
//       }
//     }

//     setProcessing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <CardElement className="border p-3 rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || !clientSecret || processing}
//           className="btn btn-primary w-full"
//         >
//           {processing ? "Processing..." : `Pay ৳${amount}`}
//         </button>
//       </form>

//       {transactionId && (
//         <p className="text-green-600 mt-4">
//           ✅ Payment successful! Transaction ID: {transactionId}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PaymentForm;
import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiossecure from "../coustomHook/useAxiossecure";
import Swal from "sweetalert2";

const PaymentForm = ({ amount, email, month, year, onSuccess }) => {
   console.log("Received props:", { amount, email, month, year });
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiossecure();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => Swal.fire("Error", "Failed to initiate payment", "error"));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      Swal.fire("Payment Error", paymentMethodError.message, "error");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Payment Confirmation Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }
console.log("Sending payment data:", {
  amount,
  email,
  month,
  year,
  transactionId: paymentIntent.id,
});
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      try {
        await axiosSecure.post("/payments", {
          amount,
          transactionId: paymentIntent.id,
          email,
          month,
          year,
          paid: true,
        });
        Swal.fire("Success", "Payment Successful", "success");
        onSuccess && onSuccess(paymentIntent.id);
      } catch (error) {
        Swal.fire(
          "Error",
          "Failed to record payment in database: " +
            (error.response?.data?.message || error.message),
          "error"
        );
      }
    }
    setProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary w-full"
        >
          {processing ? "Processing..." : `Pay ৳${amount}`}
        </button>
      </form>

      {transactionId && (
        <p className="text-green-600 mt-4">
          ✅ Payment successful! Transaction ID: {transactionId}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;
