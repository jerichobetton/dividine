const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const Bill = require('./bill');
const User = require('./user');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to save a new user to the database
app.post('/create-user', async (req, res) => {
  try {
    const { username, email } = req.body;

    const newUser = new User({
      username,
      email,
      // other user properties
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to save a new bill to the database
app.post('/create-bill', async (req, res) => {
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

// Ensure database connection before starting the server
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Handle MongoDB connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
