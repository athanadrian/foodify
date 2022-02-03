import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';

import User from '../models/User.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';
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
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
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
    location: user.location,
  });
};

export const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError('Please provide all values!');
  }
  const user = await User.findById(req.user.userId);
  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};