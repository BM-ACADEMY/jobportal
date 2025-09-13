const mongoose = require("mongoose");

const seekerProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

const SeekerProfile = mongoose.model("SeekerProfile", seekerProfileSchema);
module.exports = SeekerProfile;