const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
    },
  }, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);
