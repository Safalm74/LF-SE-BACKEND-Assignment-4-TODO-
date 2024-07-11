import { ITask } from "../interface/task";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("User Model");

//Array for storing tasks
let tasks: ITask[] = [];

//function to check if task exists on tasks array
function checkOnTasks(id: string, user_id: string) {
  return tasks.find(({ id: taskId }) => {
    return taskId === id;
  });
}

//function to add task on array (create)
export function createTask(task: ITask, user_id: string) {
  //getting new id by increasing latest id by 1
  const newTaskId =
    tasks.length === 0 ? "1" : `${+tasks[tasks.length - 1].id + 1}`;

  //initializing is_finished flag as false
  const initialFinishFlag = false;

  //creating task obj
  const newTask: ITask = {
    ...task,
    id: newTaskId,
    is_finished: initialFinishFlag,
    user_id: user_id,
  };

  //pushing the obj to task to tasks array
  tasks.push(newTask);

  logger.info('Task Created');

  return `Task Created: ${task.name}`;
}

//reading all task function
export function readTasks(user_id: string) {
  return tasks.filter((obj) => {
    return obj.user_id === user_id;
  });
}

export function getTaskByName(user_id: string, task_name: string) {
  return tasks.find(({ user_id: userId, name }) => {
    return userId === user_id && task_name === name;
  });
}

export function getTaskById(user_id: string, task_id: string) {
  return tasks.find(({ user_id: userId, id: taskId }) => {
    return userId === user_id && taskId === task_id;
  });
}

//reading remaining task
export function readRemainingTasks(user_id: string) {
  const taskRemaining = tasks.filter((task) => {
    return !task.is_finished;
  });

  return taskRemaining;
}

//reading finished task
export function readFinishedTasks(user_id: string) {
  const taskFinished = tasks.filter((task) => {
    return task.is_finished;
  });

  return taskFinished;
}

//change task constained on tasks array
export function updateTask(id: string, updatedTask: ITask, user_id: string) {
  //calling function to return obj with the id
  const update_obj = checkOnTasks(id, user_id);

  const temp = update_obj!.name;
  const newUpdatedTask = {
    ...updatedTask,
    id: id,
    user_id: user_id,
  };

  //replacing the obj with updated obj
  Object.assign(update_obj!, newUpdatedTask);

  logger.info('Task Updated');

  return ` task updated: from (${temp}) to (${update_obj!.name})`;
}

//delete task from task array
export function deleteTask(id: string, user_id: string) {
  //calling function to return obj with the id
  const delete_obj = checkOnTasks(id, user_id);

  tasks = tasks.filter(({ id: taskId }) => {
    return !(taskId === id);
  });

  logger.info('Task Deleted');

  return ` task deleted: ${delete_obj!.name}`;
}

//delete task from task array
export function deleteAllTaskByUserId(user_id: string) {
  //calling function to return obj with the id

  tasks = tasks.filter(({ user_id: taskId }) => {
    return !(taskId === user_id);
  });

  logger.info('Tasks Deleted for user: ',user_id);
}
