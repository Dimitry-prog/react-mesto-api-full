import Router from 'express';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/CardController.js';
import { validationCard, validationCreateCard } from '../helpers/validationCelebrate.js';

const router = new Router();

router.get('/', getCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCard, deleteCard);
router.put('/:cardId/likes', validationCard, likeCard);
router.delete('/:cardId/likes', validationCard, dislikeCard);

export default router;
