import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./form.css";

function DashForm() {
  const [amount, setAmount] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [totalBill, setTotalBill] = useState("");

  const handleTotal = (e) => {
    e.preventDefault();
    console.log("Calculating:", amount, numPeople, totalBill);
  };

  const handleRequest = (e) => {
    e.preventDefault();
    console.log("Requesting:", amount, numPeople, totalBill);
  };

  const userName = "elias";
  const tip = 5.0;

  const handleSend = async (e) => {
    e.preventDefault();
    const bill = {
      userName,
      totalAmount: amount,
      numberOfPeople: numPeople,
      tip,
    };
    console.log("Sending:", amount, numPeople, totalBill);

    const data = await postData("/api/v1/bill", bill);
    console.log(data);
  };

  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return (
    <form className="form">
      <label htmlFor="amount">Amount:</label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label htmlFor="numPeople">Number of People:</label>
      <input
        type="number"
        id="numPeople"
        name="numPeople"
        value={numPeople}
        onChange={(e) => setNumPeople(e.target.value)}
        required
      />

      <label htmlFor="totalBill">You All Owe $$$:</label>
      <input
        type="text"
        id="totalBill"
        name="totalBill"
        value={totalBill}
        onChange={(e) => setTotalBill(e.target.value)}
        required
      />

      <button type="button" onClick={handleTotal}>
        Calculate Total
      </button>
      <button type="button" onClick={handleRequest}>
        Request
      </button>
      <button type="button" onClick={handleSend}>
        Send
      </button>
    </form>
  );
}

export default DashForm;
