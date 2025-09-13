const RecruiterProfile = require('../models/RecruiterProfile');

const createRecruiterProfile = async (req, res) => {
  try {
    const { company_name, gst_number } = req.body;
    const profile = new RecruiterProfile({
      user_id: req.user.id,
      company_name,
      gst_number,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRecruiterProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateRecruiterProfile = async (req, res) => {
  try {
    const { company_name, gst_number } = req.body;
    const profile = await RecruiterProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.company_name = company_name || profile.company_name;
    profile.gst_number = gst_number || profile.gst_number;
    profile.updated_at = Date.now();

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteRecruiterProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOneAndDelete({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createRecruiterProfile, getRecruiterProfile, updateRecruiterProfile, deleteRecruiterProfile };