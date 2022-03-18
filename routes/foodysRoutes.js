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
  likeFoody,
  unlikeFoody,
  getFoodyLikes,
  unVisitFoody,
  visitFoody,
  addComment,
  deleteComment,
  getProfileFoodys,
} from '../controllers/foodysController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.route('/').get(getAllFoodys).post(authenticateUser, createFoody);
router.put('/:username', authenticateUser, getProfileFoodys);
router.get('/like/:id', authenticateUser, getFoodyLikes);
router.post('/like/:id', authenticateUser, likeFoody);
router.post('/unlike/:id', authenticateUser, unlikeFoody);
router.post('/visit/:id', authenticateUser, visitFoody);
router.post('/remove-visit/:id', authenticateUser, unVisitFoody);
router.post('/comment/:id', authenticateUser, addComment);
router.delete('/:foodyId/:commentId', authenticateUser, deleteComment);
router.get('/my', authenticateUser, getMyFoodys);
router.get('/stats/:username', authenticateUser, getUserStats);
router.get('/all-stats', getAllStats);
router
  .route('/:id')
  .get(getFoody)
  .patch(authenticateUser, updateFoody)
  .delete(authenticateUser, deleteFoody);
router.put('/:id/status', authenticateUser, changeFoodyStatus);
export default router;
