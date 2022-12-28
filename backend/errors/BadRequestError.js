class BadRequestError extends Error {
  constructor(message = 'Incorrect data') {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
