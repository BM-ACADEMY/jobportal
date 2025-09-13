const express = require('express');
const router = express.Router();
const recruiterProfileController = require('../controllers/recruiterProfileController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, recruiterProfileController.createRecruiterProfile);
router.get('/', authMiddleware, recruiterProfileController.getRecruiterProfile);
router.put('/', authMiddleware, recruiterProfileController.updateRecruiterProfile);
router.delete('/', authMiddleware, recruiterProfileController.deleteRecruiterProfile);

module.exports = router;