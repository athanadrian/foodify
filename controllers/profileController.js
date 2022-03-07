import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import BadRequestError from '../errors/bad-request.js';
import Profile from '../models/Profile.js';
import Follow from '../models/Follow.js';

//@desc         Get User Profile
//@route        GET /api/v1/profile/:username
//@access       Private
export const getProfile = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  const profile = await Profile.findOne({ user: user._id }).populate('user', [
    'name',
    'email',
    'username',
    'lastName',
    'home',
  ]);

  const profileFollowStats = await Follow.findOne({ user: user._id });

  res.status(StatusCodes.OK).json({
    profile,
    totalFollowers:
      profileFollowStats.followers.length > 0
        ? profileFollowStats.followers.length
        : 0,
    totalFollowing:
      profileFollowStats.following.length > 0
        ? profileFollowStats.following.length
        : 0,
  });
};

//@desc         Get My Profile
//@route        GET /api/v1/profile/me
//@access       Private
export const getMyProfile = async (req, res, next) => {
  const { userId } = req.user;

  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    throw new BadRequestError('Profile not found');
  }

  res.status(StatusCodes.OK).json({ profile });
};

//@desc         Update logged  user profile
//@route        POST /api/v1/profile/update
//@access       Private
export const updateProfile = async (req, res, next) => {
  const { userId } = req.user;

  const { bio, facebook, youtube, twitter, instagram, profilePicUrl } =
    req.body;

  let profileFields = {};
  profileFields.user = userId;

  profileFields.bio = bio;

  profileFields.social = {};

  if (facebook) profileFields.social.facebook = facebook;

  if (youtube) profileFields.social.youtube = youtube;

  if (instagram) profileFields.social.instagram = instagram;

  if (twitter) profileFields.social.twitter = twitter;

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
