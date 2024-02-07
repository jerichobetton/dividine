const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Bill = mongoose.model('Bill', billSchema);

const newBill = new Bill({
  userId: '', // Replace with the actual user ID
  totalAmount: 0,
  numberOfPeople: 0,
  tip: 0,
});

newBill.save()
  .then(savedBill => {
    console.log('Bill saved successfully:', savedBill);
  })
  .catch(error => {
    console.error('Error saving bill:', error);
  });

module.exports = Bill;
