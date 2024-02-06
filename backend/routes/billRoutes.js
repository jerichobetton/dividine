const express = require("express");

const Bill = require("../models/bill");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { totalAmount, numberOfPeople, tip } = req.body;

    const newBill = new Bill({
      totalAmount,
      numberOfPeople,
      tip,
    });

    const savedBill = await newBill.save();
    res.json(savedBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
