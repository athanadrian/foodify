import express from 'express';
import {
  followUser,
  unFollowUser,
  getMyProfile,
  getProfile,
  getUserFollowers,
  getUserFollowing,
  updateProfile,
} from '../controllers/profileController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.post('/update', authenticateUser, updateProfile);
router.post('/me', authenticateUser, getMyProfile);
router.get('/:username', authenticateUser, getProfile);
router.get('/followers/:userId', authenticateUser, getUserFollowers);
router.get('/following/:userId', authenticateUser, getUserFollowing);
router.post('/follow/:userToFollowId', authenticateUser, followUser);
router.put('/un-follow/:userToUnFollowId', authenticateUser, unFollowUser);

export default router;
