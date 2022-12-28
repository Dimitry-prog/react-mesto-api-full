import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError .js';
import CardModel from '../models/CardModel.js';
import { httpStatusCode } from '../utils/constants.js';
import ForbiddenError from '../errors/ForbiddenError.js';

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await CardModel.create({ name, link, owner: req.user._id });
    return res.status(httpStatusCode.created).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getCards = async (req, res, next) => {
  try {
    const cards = await CardModel.find().populate(['owner', 'likes']);
    return res.json(cards);
  } catch (e) {
    return next(e);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await CardModel.findById(req.params.cardId).populate(['owner', 'likes']);

    if (!card) {
      return next(new NotFoundError('Card not found'));
    }
    if (String(card.owner._id) !== req.user._id) {
      return next(new ForbiddenError('You don\'t have permission for delete this card'));
    }

    await card.remove();

    return res.json(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const updateStatusCard = async (id, options, res, next) => {
  try {
    const card = await CardModel
      .findByIdAndUpdate(id, options, { new: true })
      .populate(['owner', 'likes']);

    if (!card) {
      return next(new NotFoundError('Card not found'));
    }
    return res.json(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const likeCard = async (req, res, next) => (
  updateStatusCard(req.params.cardId, { $addToSet: { likes: req.user._id } }, res, next)
);

export const dislikeCard = async (req, res, next) => (
  updateStatusCard(req.params.cardId, { $pull: { likes: req.user._id } }, res, next)
);
