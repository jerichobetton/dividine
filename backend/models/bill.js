const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  tip: {
    type: Number,
    default: 0,
  },
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
