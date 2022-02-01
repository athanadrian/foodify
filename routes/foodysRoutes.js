import express from 'express';
import {
  getAllFoodys,
  getFoody,
  getStats,
  createFoody,
  updateFoody,
  deleteFoody,
  getMyFoodys,
} from '../controllers/foodysController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.route('/').get(getAllFoodys).post(authenticateUser, createFoody);
router.get('/my', authenticateUser, getMyFoodys);
router.get('/stats', getStats);
router
  .route('/:id')
  .get(getFoody)
  .patch(authenticateUser, updateFoody)
  .delete(authenticateUser, deleteFoody);

export default router;
