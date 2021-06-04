const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    passwordHash: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    savedDecor: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
