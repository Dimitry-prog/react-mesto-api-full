import mongoose from 'mongoose';
import { regExpForLink } from '../utils/constants.js';

const cardModel = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regExpForLink.test(v);
      },
      message: (props) => `${props.value} is not valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'userModel',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('cardModel', cardModel);
