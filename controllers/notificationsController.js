import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import checkPermissions from '../utils/checkPermissions.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

//@desc         Get User Notifications
//@route        GET /api/v1/notifications
//@access       Private
export const getNotifications = async (req, res, next) => {
  const { userId } = req.user;

  const user = await Notification.findOne({ toUser: userId })
    .populate({
      path: 'notifications.fromUser',
      select: '-resetPasswordAttempts',
    })
    .populate('notifications.foody');

  res.status(StatusCodes.OK).json({
    totalNotifications: user.notifications.length,
    notifications: user.notifications,
  });
};

//@desc         Make notification read
//@route        POST /api/v1/notifications
//@access       Private
export const makeNotificationRead = async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (user.unreadNotification) {
    user.unreadNotification = false;
    await user.save();
  }

  res.status(StatusCodes.OK).json({ msg: 'Notification marked as read!' });
};

//@desc         Delete a notification
//@route        DELETE /api/v1/notifications/:id (notificationsId)
//@access       Private
export const deleteNotification = async (req, res, next) => {
  const { userId } = req.user;

  const { id: notificationId } = req.params;

  const notification = await Notification.findOne({ toUser: userId });

  if (!notification) {
    throw new NotFoundError(
      `Notification with id ${notificationId} does not exist!`
    );
  }

  checkPermissions(req.user, notification.toUser);

  const indexOf = notification.notifications
    .map((notifications) => notifications._id)
    .indexOf(notificationId);

  await notification.notifications.splice(indexOf, 1);

  await notification.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Notification removed successfully!' });
};
