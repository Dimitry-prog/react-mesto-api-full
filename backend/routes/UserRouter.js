import Router from 'express';
import {
  getSingleUser,
  getUserInfo,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/UserController.js';
import { validationAvatar, validationGetUser, validationProfile } from '../helpers/validationCelebrate.js';

const router = new Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validationGetUser, getSingleUser);
router.patch('/me', validationProfile, updateUserProfile);
router.patch('/me/avatar', validationAvatar, updateUserAvatar);

export default router;
