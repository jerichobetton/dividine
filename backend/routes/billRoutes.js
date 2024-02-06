const express = require("express");
const router = express.Router();
const Bill = require("../models/bill");

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

router.put("/", async (req, res) => {
  try {
    const { totalAmount, numberOfPeople, tip } = req.body;
    const updateResponse = await Bill.updateOne(
      { totalAmount },
      { numberOfPeople },
      { tip }
    );
    updateResponse.acknowledged
      ? res.json(updateResponse)
      : res.status(400).json({ error: `unable to update bill information` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
