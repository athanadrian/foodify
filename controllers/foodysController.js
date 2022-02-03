import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import Foody from '../models/Foody.js';
import checkPermissions from '../utils/checkPermissions.js';

export const getAllFoodys = async (req, res, next) => {
  const foodys = await Foody.find({});

  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
export const getMyFoodys = async (req, res, next) => {
  const myFoodys = await Foody.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ myFoodys, totalFoodys: myFoodys.length, numOfPages: 1 });
};
export const getFoody = async (req, res, next) => {
  await res.send('get-Foody');
};

export const getAllStats = async (req, res, next) => {
  const query = 'cuisine';
  let defaultAllStats = {};
  //let defaultCuisineStats = {};

  const fetchStatsByKey = async (key) => {
    let stats = await Foody.aggregate([
      { $group: { _id: `$${key}`, count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
    return stats;
  };

  const fetchCuisineStats = async () => {
    const stats = await fetchStatsByKey('cuisine');
    console.log(stats);
    const cuisineStats = {
      italian: stats.italian || 0,
      mexican: stats.mexican || 0,
      asian: stats.asian || 0,
      greek: stats.greek || 0,
    };
    return cuisineStats;
  };

  const fetchCostStats = async () => {
    const stats = await fetchStatsByKey('cost');
    console.log(stats);
    const costStats = {
      cheap: stats.cheap || 0,
      average: stats.average || 0,
      expensive: stats.expensive || 0,
    };
    return costStats;
  };

  const defaultCuisineStats = await fetchCuisineStats();
  const defaultCostStats = await fetchCostStats();
  defaultAllStats = { defaultCuisineStats, defaultCostStats };
  //}
  // if (query === 'cost') {
  // const defaultCostStats = {
  //   cheap: stats.cheap || 0,
  //   average: stats.average || 0,
  //   expensive: stats.expensive || 0,
  // };
  // defaultAllStats = { ...defaultCostStats };
  //}
  let monthlyCreations = [];
  res.status(StatusCodes.OK).json({ defaultAllStats, monthlyCreations });
};

export const getUserStats = async (req, res, next) => {
  const query = 'cuisine';
  let defaultUserStats = {};
  let stats = await Foody.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: `$${query}`, count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  if (query === 'cuisine') {
    defaultUserStats = {
      italian: stats.italian || 0,
      mexican: stats.mexican || 0,
      asian: stats.asian || 0,
      greek: stats.greek || 0,
    };
  }
  let monthlyCreations = [];
  res.status(StatusCodes.OK).json({ defaultUserStats, monthlyCreations });
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
