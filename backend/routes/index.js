import Router from 'express';
import cardRouter from './CardRouter.js';
import userRouter from './UserRouter.js';
import { validationSignin, validationSignup } from '../helpers/validationCelebrate.js';
import handleAuthUser from '../middlewares/handleAuthUser.js';
import { loginUser, logoutUser, registerUser } from '../controllers/UserAuthController.js';
import NotFoundError from '../errors/NotFoundError .js';

const router = new Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validationSignup, registerUser);
router.post('/signin', validationSignin, loginUser);
router.get('/logout', logoutUser);

router.use(handleAuthUser);

router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Path not found'));
});
export default router;
