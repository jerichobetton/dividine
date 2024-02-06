const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
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

module.exports = router;
