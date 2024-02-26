class ApiError extends Error {
  status: number;
  // eslint-disable-next-line
  errors: any;

  constructor(status: number, message: string, errors: ApiError[] = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: ApiError[] = []) {
    return new ApiError(400, message, errors);
  }

  static Conflict(message: string, errors: ApiError[] = []) {
    return new ApiError(409, message, errors);
  }

  static NotFound(message: string, errors: ApiError[] = []) {
    return new ApiError(404, message, errors);
  }
}

export default ApiError;
