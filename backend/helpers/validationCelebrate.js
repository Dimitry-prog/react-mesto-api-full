import { celebrate, Joi } from 'celebrate';
import { regExpForLink } from '../utils/constants.js';

export const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().trim().pattern(regExpForLink),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
});

export const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
});

export const validationProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .required(),
    about: Joi.string().trim().min(2).max(30)
      .required(),
  }),
});

export const validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim().pattern(regExpForLink).required(),
  }),
});

export const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .required(),
    link: Joi.string().trim().pattern(regExpForLink).required(),
  }),
});

export const validationCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

export const validationGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});
