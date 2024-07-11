import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import HttpStatusCode from "http-status-codes";
import { UnaunthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { JsonWebTokenError } from "jsonwebtoken";

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UnaunthicatedError) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }
  if (error instanceof ForbiddenError) {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      message: error.message,
    });
  }
  if (error instanceof NotFoundError) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error:error,
  });
}
