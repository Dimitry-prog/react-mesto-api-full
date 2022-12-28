class RequiredAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Required authorization error';
    this.statusCode = 401;
  }
}

export default RequiredAuthError;
