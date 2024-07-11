import express from "express";
import {
  createUser,
  getUserById,
  deleteUser,
  updatedUser,
} from "../controllers/user";
import { aunthenticate, authorize } from "../middleware/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middleware/validation";
import {
  getUserQuerySchema,
  createUserBodySchema,
  updateUserBodySchema,
  userParamSchema,
} from "../schema/user";

const router = express();

//Route to add user
router.post(
  "/",
  validateReqBody(createUserBodySchema),
  aunthenticate,
  authorize("user.post"),
  createUser
);

//Route to get user by id
router.get(
  "/:id",
  validateReqParams(userParamSchema),
  aunthenticate,
  authorize("user.get"),
  getUserById
);

//Route to update user by id
router.put(
  "/:id",
  validateReqParams(userParamSchema),
  validateReqBody(updateUserBodySchema),
  aunthenticate,
  authorize("user.put"),
  updatedUser
);

//Route to delete user by id
router.delete(
  "/:id",
  validateReqParams(userParamSchema),
  aunthenticate,
  authorize("user.delete"),
  deleteUser
);

export default router;
