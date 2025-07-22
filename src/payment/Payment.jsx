import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import UseAuth from "../context/UseAuth";
import StripeProvider from "./StripeProvider";

const Payment = () => {
  const { user } = UseAuth();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const amount = 120000; // Fixed or dynamic amount as needed

  const parsedMonth = parseInt(month, 10);
  const parsedYear = parseInt(year, 10);

  return (
    <StripeProvider>
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <h2 className="text-xl font-bold">Salary Payment</h2>

        <input
          type="number"
          placeholder="Month (1-12)"
          min={1}
          max={12}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Year (e.g. 2025)"
          min={2000}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {parsedMonth >= 1 && parsedMonth <= 12 && parsedYear >= 2000 && user?.email ? (
          <PaymentForm amount={amount} email={user.email} month={parsedMonth} year={parsedYear} />
        ) : (
          <p className="text-red-600">
            Please enter a valid month (1-12) and year more than 2000!
          </p>
        )}
      </div>
    </StripeProvider>
  );
};

export default Payment;
