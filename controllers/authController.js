import { StatusCodes } from 'http-status-codes';
import isEmail from 'validator/lib/isEmail.js';
import crypto from 'crypto';

import sendEmail from '../utils/sendEmail.js';
import BadRequestError from '../errors/bad-request.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';
import NotFoundError from '../errors/not-found.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Follow from '../models/Follow.js';

const userDefaultAvatar =
  'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png';

export const register = async (req, res, next) => {
  const { name, email, password, bio, facebook, youtube, twitter, instagram } =
    req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values!');
  }

  if (!isEmail(email)) {
    throw new BadRequestError('Invalid Email!');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use.');
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    profilePicUrl: req.body.profilePicUrl || userDefaultAvatar,
  });
  const token = user.createJWT();

  let profileFields = {};
  profileFields.user = user._id;

  profileFields.bio = bio;

  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;

  await new Profile(profileFields).save();
  await new Follow({
    user: user._id,
    followers: [],
    following: [],
  }).save();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email.toLowerCase(),
      lastName: user.lastName,
      home: user.home,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
    home: user.home,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials!');
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnAuthenticatedError('Invalid password');
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    home: user.home,
    location: user.location,
  });
};

export const updateUser = async (req, res, next) => {
  const { email, name, lastName, home, location } = req.body;
  if (!name || !email || !lastName || !home || !location) {
    throw new BadRequestError('Please provide all values!');
  }
  const user = await User.findById(req.user.userId);
  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.home = home;
  user.location = location;

  await user.save();
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user, token, home: user.home, location: user.location });
};

//@desc         Forgot Password
//@route        POST /api/v1/auth/forgot-password
//@access       Public
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError('Please provide a valid email!');
  }

  if (!isEmail(email)) {
    throw new BadRequestError('Invalid Email!');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('There is no such email in Database!');
  }

  // Get reset Token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Link',
      token: resetToken,
    });

    return res.status(200).json('Email sent successfully');
  } catch (error) {
    console.log('Sending email error:', error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return res.status(StatusCodes.BAD_REQUEST).json('Email could not be sent');
  }
};

//@desc         Reset Password
//@route        PUT /api/v1/auth/reset-password/:resetToken
//@access       Public
export const resetPassword = async (req, res, next) => {
  // Get hashed password
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    user.resetPasswordAttempts.push({ success: false, date: Date.now() });

    await user.save({ validateBeforeSave: false });
    throw new UnAuthenticatedError('Invalid token. Token expired!');
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.resetPasswordAttempts.push({ success: true, date: Date.now() });
  await user.save();

  return res.status(StatusCodes.OK).json('Password updated');
};
