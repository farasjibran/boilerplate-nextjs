export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code = "VALIDATION_ERROR") {
    super(message, 400, code);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code = "NOT_FOUND") {
    super(message, 404, code);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", code = "UNAUTHORIZED") {
    super(message, 401, code);
    this.name = "UnauthorizedError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code = "CONFLICT") {
    super(message, 409, code);
    this.name = "ConflictError";
  }
}
