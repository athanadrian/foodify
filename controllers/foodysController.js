import mongoose from 'mongoose';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import Foody from '../models/Foody.js';
import checkPermissions from '../utils/checkPermissions.js';

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

  result = result.skip(skip).limit(limit);
  const foodys = await result;

  const totalFoodys = await Foody.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalFoodys / limit);

  res.status(StatusCodes.OK).json({ foodys, totalFoodys, numOfPages });
};

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

  result = result.skip(skip).limit(limit);
  const myFoodys = await result;

  const totalFoodys = await Foody.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalFoodys / limit);
  res.status(StatusCodes.OK).json({ myFoodys, totalFoodys, numOfPages });
};
export const getFoody = async (req, res, next) => {
  await res.send('get-Foody');
};

////////////////// Helper functions /////////////////

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

////////////////// Helper functions /////////////////

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

export const createFoody = async (req, res, next) => {
  const { title, village } = req.body;
  if (!title || !village) {
    throw new BadRequestError('Please provide all values.');
  }
  req.body.createdBy = req.user.userId;
  const foody = await Foody.create(req.body);

  res.status(StatusCodes.CREATED).json({ foody });
};

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
