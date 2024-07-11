import { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("User Controller");

//controller function to get user by id:
export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; //getting id from request params

    const data = UserService.getUserById(id);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

//controller function to create user:
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body

    const req_user = await UserService.createUser(body);

    res.status(HttpStatusCode.CREATED).json(req_user);
  } catch (error) {
    next(error);
  }
}

//controller function to update user
export async function updatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Update user");

  try {
    const id = `${req.params.id}`;
    const { body } = req;

    res.status(HttpStatusCode.OK).json({
      msg: await UserService.updatedUser(id, body),
    });
  } catch (error) {
    next(error);
  }
}

//controller function to delete user
export function deleteUser(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: Delete user");

  try {
    const id = `${req.params.id}`;

    res.status(HttpStatusCode.NO_CONTENT).json({
      msg: UserService.deleteUser(id),
    });
  } catch (error) {
    next(error);
  }
}
