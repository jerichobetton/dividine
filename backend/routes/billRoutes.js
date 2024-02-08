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

router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.json({ message: "Bill deleted successfully", deletedBill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
