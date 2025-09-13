const mongoose = require("mongoose");

const recruiterProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  gst_number: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfileSchema);
module.exports = RecruiterProfile;