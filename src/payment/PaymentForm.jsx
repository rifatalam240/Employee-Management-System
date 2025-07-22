import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiossecure from "../coustomHook/useAxiossecure";

const PaymentForm = ({ amount, email, month, year, onSuccess, onError }) => {
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
        .catch(() => {
          if (onError) onError("Failed to initiate payment");
          else Swal.fire("Error", "Failed to initiate payment", "error");
        });
    }
  }, [amount, axiosSecure, onError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    // Create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      if (onError) onError(paymentMethodError.message);
      else Swal.fire("Payment Error", paymentMethodError.message, "error");
      setProcessing(false);
      return;
    }

    // Confirm card payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      if (onError) onError(confirmError.message);
      else Swal.fire("Payment Confirmation Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    // Payment succeeded
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      try {
        // Backend API call to save payment info
        const res = await axiosSecure.post("/paymentsbyadmin", {
          amount,
          transactionId: paymentIntent.id,
          email,
          month,
          year,
          paid: true,
        });

        if (res.data.message === "Payment already exists for this month and employee.") {
          if (onError) onError("Payment already exists for this month and employee.");
          else
            Swal.fire(
              "Warning",
              "Payment already exists for this month and employee.",
              "warning"
            );
        } else {
          Swal.fire("Success", "Payment Successful", "success");
          if (onSuccess) onSuccess(paymentIntent.id);
        }
      } catch (error) {
        const msg = error.response?.data?.message || error.message || "Unknown error";
        if (onError) onError(msg);
        else Swal.fire("Error", msg, "error");
      }
    }
    setProcessing(false);
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {processing ? "Processing..." : `Pay ৳${amount}`}
        </button>
      </form>

      {transactionId && (
        <p className="text-green-600 mt-4 text-center">
          ✅ Payment successful! <br /> Transaction ID:{" "}
          <span className="font-mono">{transactionId}</span>
        </p>
      )}
    </div>
  );
};

export default PaymentForm;
