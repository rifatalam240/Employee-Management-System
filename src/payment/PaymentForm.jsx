import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiossecure from "../coustomHook/useAxiossecure";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiossecure();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Fetch clientSecret from backend
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[Payment Error]", error);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("[Confirm Error]", confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // save to DB if needed
      await axiosSecure.post("/payments", {
        amount,
        transactionId: paymentIntent.id,
        email: "employee@gmail.com",
        month: "07",
        year: "2025",
        paid: true,
      });
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary w-full"
        >
          {processing ? "Processing..." : "Pay"}
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
