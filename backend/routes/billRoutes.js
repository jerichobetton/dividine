const express = require("express");
const router = express.Router();
const Bill = require("../models/bill");

router.post("/", async (req, res) => {
  try {
    const { userName, totalAmount, numberOfPeople, tip } = req.body;

    const newBill = new Bill({
      username: userName,
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

// Get a Bill
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

// Get ALL bills
router.get("/all/:username", async (req, res) => {
  try {
    const allBill = await Bill.find(req.params.username);
    if (!allBill) {
      return res.status(404).json({ error: "Bills not found" });
    }
    res.json(allBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { totalAmount, numberOfPeople, tip } = req.body;
    const updateResponse = await Bill.updateOne(
      { _id },
      { totalAmount, numberOfPeople, tip }
    );
    updateResponse.acknowledged
      ? res.json(updateResponse)
      : res.status(400).json({ error: `unable to update bill information` });
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
