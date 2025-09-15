const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  email_verified: { type: Boolean, default: false },
  email_otp: { type: String }, // Store OTP
  otp_expires: { type: Date }, // OTP expiration time
});

module.exports = mongoose.model("User", userSchema);