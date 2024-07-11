import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { ITask } from "../interface/task";
import * as TaskHandlerModel from "../models/task";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Auth Service");

//service to handle create task
export function createTask(task: ITask, user_id: string) {
  logger.info('Attempting to add task');

  //getting task by name
  const existingTask=TaskHandlerModel.getTaskByName(user_id,task.name);
  
  //to prevent to create repeated task
  if(existingTask){
    logger.warn('Task already exists for the user');
    
    throw (new BadRequestError("Task already exists for the user"));
  }

  return TaskHandlerModel.createTask(task, user_id);
}

//service to handle read task
export function readTasks(user_id: string) {
  const readData = TaskHandlerModel.readTasks(user_id);

  return readData;
}
//service to handle read task
export function readRemainingTasks(user_id: string) {
  const readData = TaskHandlerModel.readRemainingTasks(user_id);

  return readData;
}
//service to handle read task
export function readFinishedTasks(user_id: string) {
  const readData = TaskHandlerModel.readFinishedTasks(user_id);
  
  return readData;
}

//service to handle update task
export function updatedTask(id: string, updatedTask: ITask, user_id: string) {
  logger.info('Attempting to update task');

  const data = TaskHandlerModel.getTaskById(user_id,id);

  if (!data) {

    throw new NotFoundError("Task not found");
  }

  //getting task by name
  const existingTask=TaskHandlerModel.getTaskByName(user_id,updatedTask.name);
  
  //to prevent to create repeated task
  if(existingTask){
    throw (new BadRequestError("Task already exists for the user"));
  }

  return TaskHandlerModel.updateTask(id, updatedTask, user_id);
}

//service to handle delete task
export function deleteTask(taskId: string, user_id: string) {
  logger.info('Attempting to delete task');

  const data = TaskHandlerModel.getTaskById(user_id,taskId);

  if (!data) {

    throw new NotFoundError("Task not found");
  }
  return TaskHandlerModel.deleteTask(taskId, user_id);
}

//service to handle delete task
export function deleteAllTaskByUserId(user_id: string) {
  return TaskHandlerModel.deleteAllTaskByUserId(user_id);
}
