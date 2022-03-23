import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Follow from '../models/Follow.js';
import Foody from '../models/Foody.js';
import {
  newNotification,
  removeNotification,
} from '../utils/notificationFunctions.js';

//@desc         Get User Profile
//@route        GET /api/v1/profile/:username
//@access       Private
export const getProfile = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const profile = await Profile.findOne({ user: user._id }).populate('user', [
    '_id',
    'name',
    'email',
    'username',
    'lastName',
    'home',
    'profilePicUrl',
  ]);

  const totalCreations = await Foody.find({
    createdBy: user._id,
  });

  const totalVisits = await Foody.find({
    'visits.user': user._id,
  });

  const totalLikes = await Foody.find({
    'likes.user': user._id,
  });
  const totalComments = await Foody.find({
    'comments.user': user._id,
  });

  const { followers, following } = await Follow.findOne({ user: user._id });

  res.status(StatusCodes.OK).json({
    profile,
    totalCreations: totalCreations.length > 0 ? totalCreations.length : 0,
    totalVisits: totalVisits.length > 0 ? totalVisits.length : 0,
    totalLikes: totalLikes.length > 0 ? totalLikes.length : 0,
    totalComments: totalComments.length > 0 ? totalComments.length : 0,
    totalFollowers: followers.length > 0 ? followers.length : 0,
    totalFollowing: following.length > 0 ? following.length : 0,
  });
};

//@desc         Get My Profile
//@route        GET /api/v1/profile/me
//@access       Private
export const getMyProfile = async (req, res, next) => {
  const { userId } = req.user;

  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  res.status(StatusCodes.OK).json({ profile });
};

//@desc         Update logged  user profile
//@route        POST /api/v1/profile/update
//@access       Private
export const updateProfile = async (req, res, next) => {
  const { userId } = req.user;

  const {
    bio,
    company,
    website,
    mobile,
    facebook,
    youtube,
    twitter,
    instagram,
    messenger,
    whatsApp,
    viber,
    profilePicUrl,
  } = req.body;

  let profileFields = {};
  profileFields.user = userId;

  profileFields.bio = bio;
  profileFields.company = company;
  profileFields.website = website;
  profileFields.mobile = mobile;

  profileFields.social = {};

  if (facebook) profileFields.social.facebook = facebook;

  if (youtube) profileFields.social.youtube = youtube;

  if (instagram) profileFields.social.instagram = instagram;

  if (twitter) profileFields.social.twitter = twitter;
  if (messenger) profileFields.social.messenger = messenger;
  if (whatsApp) profileFields.social.whatsApp = whatsApp;
  if (viber) profileFields.social.viber = viber;

  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: profileFields },
    { new: true }
  );

  if (profilePicUrl) {
    const user = await User.findById(userId);
    user.profilePicUrl = profilePicUrl;
    await user.save();
  }

  res.status(StatusCodes.OK).json({ profile });
};

//@desc         GET FOLLOWERS OF USER
//@route        POST /api/v1/profile/followers/:userId
//@access       Private
export const getUserFollowers = async (req, res, next) => {
  const { userId } = req.params;

  const user = await Follow.findOne({ user: userId }).populate({
    path: 'followers.user',
    select: '-resetPasswordAttempts',
  });
  return res.status(StatusCodes.OK).json(user.followers);
};

//@desc         GET FOLLOWING OF USER
//@route        POST /api/v1/profile/follow/:userToFollowId
//@access       Private
export const getUserFollowing = async (req, res, next) => {
  const { userId } = req.params;

  const user = await Follow.findOne({ user: userId }).populate({
    path: 'following.user',
    select: '-resetPasswordAttempts',
  });
  return res.json(user.following);
};

//@desc         FOLLOW A USER
//@route        POST /api/v1/profile/follow/:userToFollowId
//@access       Private
export const followUser = async (req, res, next) => {
  const { userId } = req.user;
  const { userToFollowId } = req.params;

  const user = await Follow.findOne({ user: userId });
  const userToFollow = await Follow.findOne({ user: userToFollowId });

  if (!user || !userToFollow) {
    throw new NotFoundError('User not found');
  }

  const isFollowing =
    user.following.length > 0 &&
    user.following.filter(
      (following) => following.user.toString() === userToFollowId
    ).length > 0;

  if (isFollowing) {
    throw new BadRequestError('User Already Followed');
  }

  await user.following.unshift({ user: userToFollowId });
  await user.save();

  await userToFollow.followers.unshift({ user: userId });
  await userToFollow.save();

  await newNotification({
    type: 'newFollower',
    userId,
    userToNotifyId: userToFollowId,
  });

  return res.status(StatusCodes.OK).json({ msg: 'Followed!' });
};

//@desc         UN-FOLLOW A USER
//@route        POST /api/v1/profile/un-follow/:userToUnFollowId
//@access       Private
export const unFollowUser = async (req, res, next) => {
  const { userId } = req.user;
  const { userToUnFollowId } = req.params;

  const user = await Follow.findOne({ user: userId });
  const userToUnFollow = await Follow.findOne({ user: userToUnFollowId });

  if (!user || !userToUnFollow) {
    throw new NotFoundError('User not found');
  }

  const isFollowing =
    user.following.length > 0 &&
    user.following.filter(
      (following) => following.user.toString() === userToUnFollowId
    ).length === 0;

  if (isFollowing) {
    throw new BadRequestError('User Not Followed before');
  }

  const removeFollowingIndex = user.following
    .map((following) => following.user.toString())
    .indexOf(userToUnFollowId);

  await user.following.splice(removeFollowingIndex, 1);
  await user.save();
  const removeFollowerIndex = userToUnFollow.followers
    .map((follower) => follower.user.toString())
    .indexOf(userId);

  await userToUnFollow.followers.splice(removeFollowerIndex, 1);
  userToUnFollow.save();

  await removeNotification({
    type: 'newFollower',
    userId,
    userToNotifyId: userToUnFollowId,
  });
  return res.status(StatusCodes.OK).json({ msg: 'Un-followed' });
};
