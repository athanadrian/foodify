import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import Foody from '../models/Foody.js';

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
export const getStats = async (req, res, next) => {
  await res.send('get-stats');
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
  await res.send('update-Foody');
};
export const deleteFoody = async (req, res, next) => {
  await res.send('delete-Foody');
};
