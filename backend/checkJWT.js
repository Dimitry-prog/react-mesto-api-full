import jwt from 'jsonwebtoken';

const verifyToken =  () => {
  const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FjYTZjY2UzM2VkMjI0MWEyNTAyZWYiLCJpYXQiOjE2NzI3NTcxNTEsImV4cCI6MTY3MzM2MTk1MX0.DP8mOo5u6jAN3NvdehqwX5V6ciD-oiNHyCTpaG7CF5U'; // вставьте сюда JWT, который вернул публичный сервер
  const SECRET_KEY_DEV = '2afbe486eb33798be7b718a06facc976e17adc7b863c16d85802b91cfe68ef5d'; // вставьте сюда секретный ключ для разработки из кода

  let payload;
  try {
    payload =  jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }

  return payload;
};

export default verifyToken;
