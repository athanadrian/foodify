import express from 'express';
import {
  getNotifications,
  makeNotificationRead,
  deleteNotification,
} from '../controllers/notificationsController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, getNotifications)
  .post(authenticateUser, makeNotificationRead);
router.route('/:id').delete(authenticateUser, deleteNotification);

export default router;
