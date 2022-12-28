import rateLimit from 'express-rate-limit';

export const regExpForLink = /(^https?:\/\/[w{3}]?.?[a-zA-z0-9-]+[.\w{2,}]*)[\\/\w{1,}]*/;

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const httpStatusCode = {
  created: 201,
  ok: 200,
};

export const allowedCors = [
  'http://sprint-15.nomoredomains.club',
  'http://api.sprint-15.nomoredomains.club',
  'https://sprint-15.nomoredomains.club',
  'https://api.sprint-15.nomoredomains.club',
  'localhost:3000',
  'localhost:5000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:5000',
  'https://localhost:5000',
];

export const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};


