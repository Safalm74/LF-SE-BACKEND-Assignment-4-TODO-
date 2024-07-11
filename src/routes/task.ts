// importing module express
import express from "express";
import * as TaskController from "../controllers/task";
import { aunthenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validation";
import { createTaskBodySchema, deleteTaskBodySchema, taskParamSchema, updateTaskBodySchema } from "../schema/task";

//creating route
const router = express();

//route to create task: C
router.post(
  "/",
  validateReqBody(createTaskBodySchema),
  aunthenticate,
  authorize("task.post"),
  TaskController.createTask
);

//route to read tasks:  R
router.get(
  "/",
  aunthenticate,
  authorize("task.get"),
  TaskController.readTasks
);
//route to read remaining tasks:
router.get(
  "/RemainingTasks",
  aunthenticate,
  authorize("task.get"),
 TaskController.readRemainingTasks
);
//route to read finished tasks:
router.get(
  "/",
  aunthenticate,
  authorize("task.get"),
 TaskController.readFinishedTasks
);

//route to update task: U
router.put(
  "/:id",
  validateReqParams(taskParamSchema),
  validateReqBody(updateTaskBodySchema),
  aunthenticate,
  authorize("task.put"),
 TaskController.updatedTask
);

//route to delete task: D
router.delete(
  "/:id",
  validateReqParams(taskParamSchema),
  validateReqBody(deleteTaskBodySchema),
  aunthenticate,
  authorize("task.delete"),
 TaskController.deleteTask
);

//exporting tasks handler router
export default router;
