import User from '../models/User.js';
import Notification from '../models/Notification.js';
import NotFoundError from '../errors/not-found.js';

const setNotificationToUnread = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError('User not found!');
  }
  if (!user.unreadNotification) {
    user.unreadNotification = true;
  }
  await user.save();
};

const newNotification = async ({
  type,
  userId,
  foodyId,
  userToNotifyId,
  commentId,
  text,
}) => {
  // the owner/creator of the foody
  const userToNotify = await Notification.findOne({ toUser: userToNotifyId });
  let newNotification = {};
  if (type === 'newLike' || type === 'newVisit') {
    newNotification = {
      type,
      // the logged user
      fromUser: userId,
      foody: foodyId,
      date: Date.now(),
    };
  }
  if (type === 'newFollower') {
    newNotification = {
      type,
      // the logged user
      fromUser: userId,
      date: Date.now(),
    };
  }
  if (type === 'newComment') {
    newNotification = {
      type,
      // the logged user
      fromUser: userId,
      foody: foodyId,
      commentId,
      text,
      date: Date.now(),
    };
  }

  await userToNotify.notifications.unshift(newNotification);
  await userToNotify.save();

  await setNotificationToUnread(userToNotify.toUser.toString());
};

const removeNotification = async ({
  type,
  userId,
  foodyId,
  userToNotifyId,
}) => {
  // the owner/creator of the foody
  const userToNotify = await Notification.findOne({ toUser: userToNotifyId });
  let notificationToRemove;
  if (type !== 'newFollower') {
    notificationToRemove = userToNotify.notifications.find(
      (notification) =>
        notification.type === type &&
        notification.foody.toString() === foodyId &&
        notification.fromUser.toString() === userId
    );
  }

  if (type === 'newFollower') {
    notificationToRemove = await userToNotify.notifications.find(
      (notification) =>
        notification.type === type &&
        notification.fromUser.toString() === userId
    );
  }

  const indexOf = await userToNotify.notifications.map((notification) =>
    notification._id.toString().indexOf(notificationToRemove._id.toString())
  );

  await userToNotify.notifications.slice(indexOf, 1);

  await userToNotify.save();
};

export { newNotification, removeNotification };
