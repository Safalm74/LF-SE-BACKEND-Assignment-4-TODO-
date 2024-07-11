import { JsonWebTokenError, verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import config from "../config";
import { IUser } from "../interface/user";
import { UnaunthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Auth Middleware");

//middleware function to Aunthenticate
export function aunthenticate(req: Request, res: Response, next: NextFunction) {
  logger.info('Authenticating user by email');

  //extracting authorization from request header
  const { authorization } = req.headers;

  logger.info('Checking if token exists');
  //checking if token is provided in authorization
  if (!authorization) {
    logger.error('No token provided');
    next(new UnaunthicatedError("Un-Aunthenticated"));
  }

  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  const token = authorization?.split(" ");

  if (token?.length !== 2 || token[0] !== "Bearer") {
    logger.error('Invalid token');
    next(new UnaunthicatedError("Un-Aunthenticated"));

    return;
  }
  logger.info('verifying token');
  try {
    //JWT verify verifies the token and returns decoded token if verified
    const user = verify(token[1], config.jwt.jwt_secret!) as Omit<IUser,"password"|"role">;

    logger.info('Verified token');

    req.user=user;

    //to next fuction of route
    next();
  } catch (error) {
    logger.error('Token verification failed');

    next(error);
  }
}

//middleware function to Authorize
export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user!;

    logger.info(`Checking permissions for user: ${user.id}`);

    //checking if permision required includes for user
    if (!user.permissions.includes(permission)) {
      //logger.error('Permission not granted');
      
      next(new ForbiddenError("Forbidden"));
    }else{
      logger.info("Authorized");

      next();
    }
  };
}
