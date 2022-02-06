import express from 'express';
import {
  getAllFoodys,
  getFoody,
  getUserStats,
  getAllStats,
  createFoody,
  updateFoody,
  deleteFoody,
  getMyFoodys,
  changeFoodyStatus,
} from '../controllers/foodysController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.route('/').get(getAllFoodys).post(authenticateUser, createFoody);
router.get('/my', authenticateUser, getMyFoodys);
router.get('/user-stats', authenticateUser, getUserStats);
router.get('/all-stats', getAllStats);
router
  .route('/:id')
  .get(getFoody)
  .patch(authenticateUser, updateFoody)
  .delete(authenticateUser, deleteFoody);
router.put('/:id/status', authenticateUser, changeFoodyStatus);
export default router;
