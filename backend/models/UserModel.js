import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { regExpForLink } from '../utils/constants.js';
import RequiredAuthError from '../errors/RequiredAuthError.js';

const userModel = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Your name',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Your activity',
  },
  avatar: {
    type: String,
    imageURL: String,
    validate: {
      validator(v) {
        return regExpForLink.test(v);
      },
      message: (props) => `${props.value} is not valid link!`,
    },
    default: 'https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userModel.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const findUser = await this.findOne({ email }).select('+password');
  if (!findUser) {
    throw new RequiredAuthError('Authorization required');
  }
  const checkPassword = await bcrypt.compare(password, findUser.password);
  if (!checkPassword) {
    throw new RequiredAuthError('Authorization required');
  }
  return findUser;
};

export default mongoose.model('userModel', userModel);
