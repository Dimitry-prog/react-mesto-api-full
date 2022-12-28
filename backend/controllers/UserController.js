import NotFoundError from '../errors/NotFoundError .js';
import BadRequestError from '../errors/BadRequestError.js';
import UserModel from '../models/UserModel.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (e) {
    return next(e);
  }
};

const getUserById = async (id, res, next) => {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getSingleUser = async (req, res, next) => getUserById(req.params.userId, res, next);

export const getUserInfo = async (req, res, next) => getUserById(req.user._id, res, next);

const updateProfileById = async (id, data, res, next) => {
  try {
    const user = await UserModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

    if (!user) {
      return next(new NotFoundError('Profile not found'));
    }

    return res.json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const data = {
    name,
    about,
  };
  return updateProfileById(req.user._id, data, res, next);
};

export const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const data = {
    avatar,
  };
  return updateProfileById(req.user._id, data, res, next);
};
