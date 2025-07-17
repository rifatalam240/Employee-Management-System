import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import UseAuth from "../context/UseAuth";
import StripeProvider from "./StripeProvider";

const Payment = () => {
  const { user } = UseAuth();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const amount = 120000;

  const parsedMonth = month ? parseInt(month, 10) : null;
  const parsedYear = year ? parseInt(year, 10) : null;

  console.log("Month input:", month);
  console.log("Year input:", year);
  console.log("Parsed Month:", parsedMonth);
  console.log("Parsed Year:", parsedYear);

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
          onChange={(e) => {
            console.log("Month input value:", e.target.value);
            setMonth(e.target.value);
          }}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Year (e.g. 2025)"
          min={2000}
          value={year}
          onChange={(e) => {
            console.log("Year input value:", e.target.value);
            setYear(e.target.value);
          }}
          className="border p-2 rounded w-full"
        />

        {parsedMonth >= 1 && parsedMonth <= 12 && parsedYear >= 2000 && user?.email ? (
          <PaymentForm
            amount={amount}
            email={user.email}
            month={parsedMonth}
            year={parsedYear}
          />
        ) : (
          <p className="text-red-600">
            Please enter valid month (1-12) and year (>=2000)
          </p>
        )}
      </div>
    </StripeProvider>
  );
};

export default Payment;
