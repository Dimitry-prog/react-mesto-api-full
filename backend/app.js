import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions, limiter } from './utils/constants.js';
import appRouter from './routes/index.js';
import handleErrors from './middlewares/handleErrors.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';

dotenv.config();

const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.use(express.static('../frontend/build'));

app.use(requestLogger);

app.use(cors(corsOptions));

app.use(appRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log('SERVER WORK!!!'));
  } catch (e) {
    console.log(e);
  }
};

startApp();
