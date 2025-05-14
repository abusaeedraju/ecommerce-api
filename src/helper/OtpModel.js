const { Schema, model } = require("mongoose");

const optSchema = new Schema({
  otp: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const Otp = model("Otp", optSchema);
module.exports = Otp;
