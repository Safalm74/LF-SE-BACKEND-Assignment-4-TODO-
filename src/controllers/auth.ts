import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth";
import HttpStatusCode from "http-status-codes";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const logger=loggerWithNameSpace('Auth Controller');

//Controller function to login:
/*
  Responds with access token and refresh token if credentials 
  are correct else error is responded
*/
export async function login(req: Request, res: Response, next: NextFunction) {
  logger.info('Request: login');
  try {
    const { body } = req; //extracting body from req for credential
    const data = await AuthService.login(body);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

//Controller function that uses refesh token to generate new access token:
/*
  Responds with new access token  if valid refresh token id provided else
  error is responded
*/
export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info('Request: Refresh access token');
  try {
    const { authorization } = req.headers; //extracting authorization from request header
    //checking if token is provided in authorization
    if (!authorization) {
      throw (new BadRequestError("No token provided"));
    }
  //generating new access token using the refresh token
  const data = await AuthService.refreshAccessToken(authorization);
  res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
