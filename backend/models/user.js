const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // other user properties
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
