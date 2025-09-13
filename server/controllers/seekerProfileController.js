const SeekerProfile = require('../models/SeekerProfile');

const createSeekerProfile = async (req, res) => {
  try {
    const profile = new SeekerProfile({
      user_id: req.user.id,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.updated_at = Date.now();
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOneAndDelete({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createSeekerProfile, getSeekerProfile, updateSeekerProfile, deleteSeekerProfile };