import express from 'express';
import {
  getMyProfile,
  getProfile,
  updateProfile,
} from '../controllers/profileController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.post('/update', authenticateUser, updateProfile);
router.post('/me', authenticateUser, getMyProfile);
router.get('/:username', getProfile);

export default router;
