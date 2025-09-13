const express = require('express');
const router = express.Router();
const seekerProfileController = require('../controllers/seekerProfileController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, seekerProfileController.createSeekerProfile);
router.get('/', authMiddleware, seekerProfileController.getSeekerProfile);
router.put('/', authMiddleware, seekerProfileController.updateSeekerProfile);
router.delete('/', authMiddleware, seekerProfileController.deleteSeekerProfile);

module.exports = router;