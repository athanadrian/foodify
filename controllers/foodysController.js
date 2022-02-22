import mongoose from 'mongoose';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import Foody from '../models/Foody.js';
import User from '../models/User.js';
import checkPermissions from '../utils/checkPermissions.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';

//@desc         Get User foodys
//@route        GET /api/v1/foodys
//@access       Private
export const getAllFoodys = async (req, res, next) => {
  const { status, cost, foody, cuisine, sort, search } = req.query;

  const queryObj = { status };

  if (cost !== 'all') {
    queryObj.cost = cost;
  }

  if (foody !== 'all') {
    queryObj.foody = foody;
  }

  if (cuisine !== 'all') {
    queryObj.cuisine = cuisine;
  }

  if (search) {
    queryObj.village = { $regex: search, $options: 'i' };
  }

  let result = Foody.find(queryObj);

  if (sort === 'latest-created') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest-created') {
    result = result.sort('createdAt');
  }
  if (sort === 'latest-updated') {
    result = result.sort('-updatedAt');
  }
  if (sort === 'oldest-updated') {
    result = result.sort('updatedAt');
  }
  if (sort === 'a-z') {
    result = result.sort('village');
  }
  if (sort === 'z-a') {
    result = result.sort('-village');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result
    .skip(skip)
    .limit(limit)
    .populate({ path: 'createdBy', select: '-resetPasswordAttempts' })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'comments.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'visits.user', select: '-resetPasswordAttempts' });
  const foodys = await result;

  const totalFoodys = await Foody.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalFoodys / limit);

  res.status(StatusCodes.OK).json({ foodys, totalFoodys, numOfPages });
};

//@desc         Get User foodys
//@route        GET /api/v1/foodys/my
//@access       Private
export const getMyFoodys = async (req, res, next) => {
  const { status, cost, foody, cuisine, sort, search } = req.query;

  const queryObj = { createdBy: req.user.userId };

  if (status !== 'all') {
    queryObj.status = status;
  }

  if (cost !== 'all') {
    queryObj.cost = cost;
  }

  if (foody !== 'all') {
    queryObj.foody = foody;
  }

  if (cuisine !== 'all') {
    queryObj.cuisine = cuisine;
  }

  if (search) {
    queryObj.village = { $regex: search, $options: 'i' };
  }

  let result = Foody.find(queryObj);

  if (sort === 'latest-created') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest-created') {
    result = result.sort('createdAt');
  }
  if (sort === 'latest-updated') {
    result = result.sort('-updatedAt');
  }
  if (sort === 'oldest-updated') {
    result = result.sort('updatedAt');
  }
  if (sort === 'a-z') {
    result = result.sort('village');
  }
  if (sort === 'z-a') {
    result = result.sort('-village');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result
    .skip(skip)
    .limit(limit)
    .populate({ path: 'createdBy', select: '-resetPasswordAttempts' })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'visits.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'comments.user', select: '-resetPasswordAttempts' });
  const myFoodys = await result;

  const totalFoodys = await Foody.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalFoodys / limit);
  res.status(StatusCodes.OK).json({ myFoodys, totalFoodys, numOfPages });
};

//@desc         Get single foody
//@route        GET /api/v1/foodys/:id (foodyId)
//@access       Private
export const getFoody = async (req, res, next) => {
  const { id: foodyId } = req.params;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'createdBy', select: '-resetPasswordAttempts' })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'visits.user', select: '-resetPasswordAttempts' })
    .populate({ path: 'comments.user', select: '-resetPasswordAttempts' })
    .exec();

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  res.status(StatusCodes.OK).json({ foody });
};

////////////////// START Helper functions /////////////////

const arrayToObject = (array) => {
  return array.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
};

const fetchCuisineStats = (stats) => {
  return {
    italian: stats.italian || 0,
    mexican: stats.mexican || 0,
    asian: stats.asian || 0,
    greek: stats.greek || 0,
  };
};

const fetchCostStats = (stats) => {
  return {
    cheap: stats.cheap || 0,
    average: stats.average || 0,
    expensive: stats.expensive || 0,
  };
};

const fetchFoodyStats = (stats) => {
  return {
    meze: stats.meze || 0,
    alaCarte: stats.alaCarte || 0,
    buffet: stats.buffet || 0,
  };
};

const mapMonthlyCreations = (data) => {
  return data
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();
};

////////////////// END Helper functions /////////////////

//@desc         Get All User statistics
//@route        GET /api/v1/foodys/all-stats
//@access       Private
export const getAllStats = async (req, res, next) => {
  let defaultAllStats = {};
  let monthlyAllCreations = [];

  const fetchAllStatsByKey = async (key) => {
    let stats = await Foody.aggregate([
      { $group: { _id: `$${key}`, count: { $sum: 1 } } },
    ]);
    return arrayToObject(stats);
  };

  const defaultCuisineStats = fetchCuisineStats(
    await fetchAllStatsByKey('cuisine')
  );
  const defaultCostStats = fetchCostStats(await fetchAllStatsByKey('cost'));
  const defaultFoodyStats = fetchFoodyStats(await fetchAllStatsByKey('foody'));
  defaultAllStats = {
    defaultCuisineStats,
    defaultCostStats,
    defaultFoodyStats,
  };

  monthlyAllCreations = await Foody.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyAllCreations = mapMonthlyCreations(monthlyAllCreations);

  res.status(StatusCodes.OK).json({ defaultAllStats, monthlyAllCreations });
};

//@desc         Get User statistics
//@route        GET /api/v1/foodys/my-stats
//@access       Private
export const getUserStats = async (req, res, next) => {
  let defaultUserStats = {};
  let monthlyUserCreations = [];

  const fetchUserStatsByKey = async (key) => {
    let stats = await Foody.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: `$${key}`, count: { $sum: 1 } } },
    ]);
    return arrayToObject(stats);
  };

  const defaultCuisineStats = fetchCuisineStats(
    await fetchUserStatsByKey('cuisine')
  );
  const defaultCostStats = fetchCostStats(await fetchUserStatsByKey('cost'));
  const defaultFoodyStats = fetchFoodyStats(await fetchUserStatsByKey('foody'));
  defaultUserStats = {
    defaultCuisineStats,
    defaultCostStats,
    defaultFoodyStats,
  };

  monthlyUserCreations = await Foody.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyUserCreations = mapMonthlyCreations(monthlyUserCreations);

  res.status(StatusCodes.OK).json({ defaultUserStats, monthlyUserCreations });
};

//@desc         Create a foody
//@route        POST /api/v1/foodys
//@access       Private
export const createFoody = async (req, res, next) => {
  const { title, village } = req.body;
  if (!title || !village) {
    throw new BadRequestError('Please provide all values.');
  }
  req.body.createdBy = req.user.userId;
  const foody = await Foody.create(req.body);

  res.status(StatusCodes.CREATED).json({ foody });
};

//@desc         Update a foody
//@route        PATCH /api/v1/foodys/:id (foodyId)
//@access       Private
export const updateFoody = async (req, res, next) => {
  const { id: foodyId } = req.params;

  const { title, village } = req.body;
  if (!title || !village) {
    throw new BadRequestError('Please provide all values.');
  }
  const foody = await Foody.findOne({ _id: foodyId });

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  // sending the user if in the future want to check for the role also
  checkPermissions(req.user, foody.createdBy);

  const updatedFoody = await Foody.findOneAndUpdate(
    { _id: foodyId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedFoody });
};

export const changeFoodyStatus = async (req, res, next) => {
  const { id: foodyId } = req.params;

  const foody = await Foody.findOne({ _id: foodyId });

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  // sending the user if in the future want to check for the role also
  checkPermissions(req.user, foody.createdBy);

  const changedStatusFoody = await Foody.findOneAndUpdate(
    { _id: foodyId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ changedStatusFoody });
};

//@desc         Delete a foody
//@route        DELETE /api/v1/foodys/:id (foodyId)
//@access       Private
export const deleteFoody = async (req, res, next) => {
  const { id: foodyId } = req.params;

  const foody = await Foody.findOne({ _id: foodyId });

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  // sending the user if in the future want to check for the role also
  checkPermissions(req.user, foody.createdBy);

  await foody.remove();

  res.status(StatusCodes.OK).json({ msg: 'Foody removed successfully!' });
};

//@desc         Like a foody
//@route        POST /api/v1/foodys/like/:id (foodyId)
//@access       Private
export const likeFoody = async (req, res) => {
  const foodyId = req.params.id;
  const { userId } = req.user;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .exec();

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const isLiked =
    foody.likes.filter((like) => like.user._id.toString() === userId).length >
    0;

  if (isLiked) {
    throw new BadRequestError('Foody already liked');
  }
  const user = await User.findOne({ _id: userId }).select(
    '-resetPasswordAttempts'
  );
  const like = {
    user,
    date: Date.now(),
  };
  await foody.likes.unshift(like);

  await foody.save();
  // if (foody.createdBy.toString() !== userId) {
  //   await newLikeNotification(userId, foodyId, foody.user.toString());
  // }

  return res.status(StatusCodes.OK).json(foody.likes);
};

//@desc         Unlike a foody
//@route        POST /api/v1/foodys/unlike/:id (foodyId)
//@access       Private
export const unlikeFoody = async (req, res) => {
  const foodyId = req.params.id;
  const { userId } = req.user;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .exec();
  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const isLiked =
    foody.likes.filter((like) => like.user._id.toString() === userId).length ===
    0;

  if (isLiked) {
    throw new BadRequestError('Foody not liked before');
  }

  const index = foody.likes
    .map((like) => like.user._id.toString())
    .indexOf(userId);

  await foody.likes.splice(index, 1);

  await foody.save();

  // if (foody.user.toString() !== userId) {
  //   await removeLikeNotification(userId, foodyId, foody.user.toString());
  // }

  return res.status(StatusCodes.OK).json(foody.likes);
};

//@desc         Visit a foody
//@route        POST /api/v1/foodys/visit/:id (foodyId)
//@access       Private
export const visitFoody = async (req, res) => {
  const foodyId = req.params.id;
  const { userId } = req.user;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'visits.user', select: '-resetPasswordAttempts' })
    .exec();

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const isVisited =
    foody.visits.filter((visit) => visit.user._id.toString() === userId)
      .length > 0;

  if (isVisited) {
    throw new BadRequestError('Foody already visited');
  }
  const user = await User.findOne({ _id: userId }).select(
    '-resetPasswordAttempts'
  );
  const visit = { user, date: Date.now() };
  await foody.visits.unshift(visit);

  await foody.save();
  // if (foody.createdBy.toString() !== userId) {
  //   await newVisitNotification(userId, foodyId, foody.user.toString());
  // }

  return res.status(StatusCodes.OK).json(foody.visits);
};

//@desc         Remove Visit from a foody
//@route        POST /api/v1/foodys/remove-visit/:id (foodyId)
//@access       Private
export const unVisitFoody = async (req, res) => {
  const foodyId = req.params.id;
  const { userId } = req.user;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'visits.user', select: '-resetPasswordAttempts' })
    .exec();
  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const isVisited =
    foody.visits.filter((visit) => visit.user._id.toString() === userId)
      .length === 0;

  if (isVisited) {
    throw new BadRequestError('Foody not visited before');
  }

  const index = foody.visits
    .map((visit) => visit.user._id.toString())
    .indexOf(userId);

  await foody.visits.splice(index, 1);

  await foody.save();

  // if (foody.user.toString() !== userId) {
  //   await removeVisitNotification(userId, foodyId, foody.user.toString());
  // }

  return res.status(StatusCodes.OK).json(foody.visits);
};

//@desc         Get all likes of a foody
//@route        GET /api/v1/foodys/like/:id (foodyId)
//@access       Private
export const getFoodyLikes = async (req, res) => {
  const { id: foodyId } = req.params;

  const foody = await Foody.findOne({ _id: foodyId })
    .populate({ path: 'likes.user', select: '-resetPasswordAttempts' })
    .exec();

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  return res.status(StatusCodes.OK).json(foody.likes);
};

//@desc         Add comment to foody
//@route        POST /api/v1/foodys/comment/:id (foodyId)
//@access       Private
export const addComment = async (req, res) => {
  const foodyId = req.params.id;
  const { userId } = req.user;
  const { text } = req.body;

  if (text.length < 1)
    throw new BadRequestError('Comment should be at least 1 character');

  const foody = await Foody.findOne({ _id: foodyId });

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const newComment = {
    _id: uuidv4(),
    text,
    user: userId,
    date: Date.now(),
  };
  await foody.comments.unshift(newComment);

  await foody.save();

  // if (foody.createdBy.toString() !== userId) {
  //   await newCommentNotification(
  //     foodyId,
  //     newComment._id,
  //     userId,
  //     foody.createdBy.toString(),
  //     text
  //   );
  // }

  return res.status(StatusCodes.OK).json(newComment);
};

//@desc         Delete comment from foody
//@route        DELETE /api/v1/foodys/:foodyId/:commentId
//@access       Private
export const deleteComment = async (req, res) => {
  const { foodyId, commentId } = req.params;
  const { userId } = req.user;

  const foody = await Foody.findOne({ _id: foodyId });

  if (!foody) {
    throw new NotFoundError(`Foody with id ${foodyId} does not exist!`);
  }

  const comment = foody.comments.find((comment) => comment._id === commentId);
  if (!comment) {
    throw new NotFoundError('No Comment found');
  }

  const user = await Foody.findOne({ _id: userId });

  const deleteFoundComment = async () => {
    const indexOf = foody.comments
      .map((comment) => comment._id)
      .indexOf(commentId);

    await foody.comments.splice(indexOf, 1);

    await foody.save();

    // if (foody.createdBy.toString() !== userId) {
    //   await removeCommentNotification(
    //     foodyId,
    //     commentId,
    //     userId,
    //     foody.createdBy.toString()
    //   );
    // }

    return res.status(StatusCodes.OK).send('Deleted Successfully');
  };
  if (comment.user.toString() !== userId) {
    if (user.role === 'root') {
      await deleteFoundComment();
    } else {
      throw new UnAuthenticatedError('Unauthorized');
    }
  }

  await deleteFoundComment();
};
