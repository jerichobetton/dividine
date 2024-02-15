const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username: userName });
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user **ADD PASSWORD AND OTHER PROPERTIES**
    const newUser = new User({
      username: userName,
      email,
      password: hashedPassword,
      // other user properties
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    // Hash the password while updating user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateResponse = await User.updateOne(
      { username: userName },
      { password: hashedPassword, email }
    );

    updateResponse.acknowledged
      ? res.json(updateResponse)
      : res.status(400).json({ error: `unable to update user ${userName}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Api
router.post("/login", async (req, res) => {
  // TODO: Implement user login logic

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res
      .status(200)
      .json({ message: "Logged in successfully", userId: user._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
